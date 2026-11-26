// 3. Forgot Password Form - Admin, Customer, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/auth/forgot-password', data)
      alert(result.message || 'Reset link sent!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Forgot Password</h3>
        <p className="text-muted text-center">Enter your email to reset your password.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
