// 5. Availability Check Form - Customer, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { availabilitySchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function AvailabilityCheckForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(availabilitySchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/bookings/check-availability', data)
      alert(result.message || 'Checking availability...')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Check Availability</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Select Hall</label>
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
            <label className="form-label">Event Date</label>
            <input type="date" className="form-control" {...register('date')} />
            {errors.date && <p className="text-danger">{errors.date.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Event Time</label>
            <select className="form-select" {...register('time')}>
              <option value="">Select Time</option>
              <option>Day (12 PM - 4 PM)</option>
              <option>Evening (7 PM - 11 PM)</option>
            </select>
            {errors.time && <p className="text-danger">{errors.time.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Check Availability</button>
        </form>
      </div>
    </div>
  )
}

export default AvailabilityCheckForm
