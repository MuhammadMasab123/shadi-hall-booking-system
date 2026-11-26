// Manage Data - CRUD: Read, Update, Delete for Halls, Bookings, Users
// Create already happens through the forms (Signup, Add Hall, Booking).
import { useEffect, useState } from 'react'
import { apiFetch, getToken } from '../api.js'

function ManageData() {
  const [halls, setHalls] = useState([])
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [editHall, setEditHall] = useState(null)
  const [editPrice, setEditPrice] = useState('')
  const [editCapacity, setEditCapacity] = useState('')

  // READ - saara data backend se lao (token ke saath - bina login ke 401 aayega)
  const [error, setError] = useState('')
  const loadData = async () => {
    if (!getToken()) {
      setError('Please login first - Manage Data sirf login ke baad dikhega.')
      return
    }
    setError('')
    // Har table alag se load karo - taake agar ek role ko ek table ki
    // permission na ho (403) to baaki tables phir bhi dikhein.
    // Hall Manager: halls + bookings dikhte hain, users sirf Admin ko.
    let loadedAny = false
    try { const h = await apiFetch('/api/halls'); setHalls(h); loadedAny = true } catch (err) { setError(err.message) }
    try { const b = await apiFetch('/api/bookings'); setBookings(b); loadedAny = true } catch (err) { setError(err.message) }
    try { const u = await apiFetch('/api/users'); setUsers(u); loadedAny = true } catch (err) { if (!loadedAny) setError(err.message) }
  }

  useEffect(() => { loadData() }, [])

  // DELETE - id se delete karo
  const deleteItem = async (path, id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return
    await apiFetch(path + '/' + id, { method: 'DELETE' })
    loadData()
  }

  // UPDATE - hall ki price aur capacity update karo
  const updateHall = async (e) => {
    e.preventDefault()
    await apiFetch('/api/halls/' + editHall._id, {
      method: 'PUT',
      body: JSON.stringify({ price: Number(editPrice), capacity: Number(editCapacity) }),
    })
    setEditHall(null)
    loadData()
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Data (CRUD)</h2>
      {error && <div className="alert alert-warning text-center">{error}</div>}

      {/* Edit Hall form - sirf tab dikhta hai jab Edit pe click karo */}
      {editHall && (
        <div className="card mx-auto mb-4" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h5>Edit Hall: {editHall.hallName}</h5>
            <form onSubmit={updateHall}>
              <div className="mb-3">
                <label className="form-label">Price (Rs.)</label>
                <input type="number" className="form-control" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacity</label>
                <input type="number" className="form-control" value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-success me-2">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditHall(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* HALLS TABLE */}
      <h4>Halls ({halls.length})</h4>
      <table className="table table-bordered">
        <thead><tr><th>Name</th><th>Location</th><th>Capacity</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {halls.map((hall) => (
            <tr key={hall._id}>
              <td>{hall.hallName}</td><td>{hall.location}</td><td>{hall.capacity}</td><td>{hall.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditHall(hall); setEditPrice(hall.price); setEditCapacity(hall.capacity) }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem('/api/halls', hall._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BOOKINGS TABLE */}
      <h4>Bookings ({bookings.length})</h4>
      <table className="table table-bordered">
        <thead><tr><th>Name</th><th>Hall</th><th>Date</th><th>Guests</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td><td>{b.hall}</td><td>{b.date}</td><td>{b.guests}</td><td>{b.status}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => deleteItem('/api/bookings', b._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* USERS TABLE */}
      <h4>Users ({users.length})</h4>
      <table className="table table-bordered">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.phone}</td><td>{u.userType || u.role}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => deleteItem('/api/users', u._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageData
