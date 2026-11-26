// 6. Booking Form - Customer
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/bookings', data)
      alert(result.message || 'Booking submitted!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Booking Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" {...register('name')} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="03xx-xxxxxxx" {...register('phone')} />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>
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
            <label className="form-label">Number of Guests</label>
            <input type="number" className="form-control" placeholder="e.g. 300" {...register('guests')} />
            {errors.guests && <p className="text-danger">{errors.guests.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit Booking</button>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
