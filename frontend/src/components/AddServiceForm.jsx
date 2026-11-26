// 10. Add Service / Package Form - Admin, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addServiceSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function AddServiceForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addServiceSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/services', data)
      alert(result.message || 'Service added!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Add Service / Package</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Service Type</label>
            <select className="form-select" {...register('serviceType')}>
              <option value="">Select Service</option>
              <option>Catering</option>
              <option>Decoration</option>
              <option>Photography</option>
            </select>
            {errors.serviceType && <p className="text-danger">{errors.serviceType.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Package Name</label>
            <input type="text" className="form-control" placeholder="e.g. Gold Package" {...register('packageName')} />
            {errors.packageName && <p className="text-danger">{errors.packageName.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Price (Rs.)</label>
            <input type="number" className="form-control" placeholder="e.g. 50000" {...register('price')} />
            {errors.price && <p className="text-danger">{errors.price.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Details</label>
            <textarea className="form-control" rows="3" placeholder="Write package details" {...register('details')}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Service</button>
        </form>
      </div>
    </div>
  )
}

export default AddServiceForm
