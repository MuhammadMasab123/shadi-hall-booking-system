// 12. Change Password Form - Admin, Customer, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function ChangePasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(changePasswordSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/auth/change-password', data)
      alert(result.message || 'Password changed!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Change Password</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input type="password" className="form-control" placeholder="Enter old password" {...register('oldPassword')} />
            {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" placeholder="Enter new password" {...register('newPassword')} />
            {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" placeholder="Confirm new password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm
