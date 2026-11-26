// 4. Search Hall Form - Customer
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchHallSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function SearchHallForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(searchHallSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/halls/search', data)
      alert(result.message || 'Searching halls...')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Search Hall</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" placeholder="Enter city / area" {...register('location')} />
          </div>
          <div className="mb-3">
            <label className="form-label">Number of Guests</label>
            <input type="number" className="form-control" placeholder="e.g. 300" {...register('guests')} />
            {errors.guests && <p className="text-danger">{errors.guests.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Price Range</label>
            <select className="form-select" {...register('priceRange')}>
              <option value="">Select Price Range</option>
              <option>Under Rs. 100,000</option>
              <option>Rs. 100,000 - 200,000</option>
              <option>Above Rs. 200,000</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Search Halls</button>
        </form>
      </div>
    </div>
  )
}

export default SearchHallForm
