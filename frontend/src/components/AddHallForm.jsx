// 8. Add Hall Form - Admin, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addHallSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function AddHallForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addHallSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/halls', data)
      alert(result.message || 'Hall added!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Add Hall Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Hall Name</label>
            <input type="text" className="form-control" placeholder="Enter hall name" {...register('hallName')} />
            {errors.hallName && <p className="text-danger">{errors.hallName.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" placeholder="Enter location" {...register('location')} />
            {errors.location && <p className="text-danger">{errors.location.message}</p>}
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
          <button type="submit" className="btn btn-primary w-100">Add Hall</button>
        </form>
      </div>
    </div>
  )
}

export default AddHallForm
