// 11. Profile Update Form - Admin, Customer, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function ProfileUpdateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/users/profile', data)
      alert(result.message || 'Profile updated!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" {...register('name')} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="03xx-xxxxxxx" {...register('phone')} />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter your address" {...register('address')} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdateForm
