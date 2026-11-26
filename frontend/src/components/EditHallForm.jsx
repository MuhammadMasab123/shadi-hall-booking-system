// 9. Edit Hall Form - Admin, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editHallSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function EditHallForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editHallSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/halls/update', data)
      alert(result.message || 'Hall updated!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Edit Hall Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Select Hall to Edit</label>
            <select className="form-select" {...register('hall')}>
              <option value="">Select Hall</option>
              <option>Royal Palace Hall</option>
              <option>Mehfil Marquee</option>
              <option>Noor Banquet Hall</option>
              <option>Garden View Hall</option>
            </select>
            {errors.hall && <p className="text-danger">{errors.hall.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Hall Name</label>
            <input type="text" className="form-control" placeholder="Enter new hall name" {...register('hallName')} />
          </div>
          <div className="mb-3">
            <label className="form-label">Capacity (Guests)</label>
            <input type="number" className="form-control" placeholder="e.g. 500" {...register('capacity')} />
            {errors.capacity && <p className="text-danger">{errors.capacity.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Price (Rs.)</label>
            <input type="number" className="form-control" placeholder="e.g. 150000" {...register('price')} />
            {errors.price && <p className="text-danger">{errors.price.message}</p>}
          </div>
          <button type="submit" className="btn btn-warning w-100">Update Hall</button>
        </form>
      </div>
    </div>
  )
}

export default EditHallForm
