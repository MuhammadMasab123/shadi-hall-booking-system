// 1. Signup Form - Customer, Hall Manager
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/auth/signup', data)
      alert(result.message || 'Signup successful!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Signup Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" {...register('name')} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="03xx-xxxxxxx" {...register('phone')} />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select className="form-select" {...register('userType')}>
              <option value="">Select User Type</option>
              <option>Customer</option>
              <option>Hall Manager</option>
            </select>
            {errors.userType && <p className="text-danger">{errors.userType.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" {...register('password')} />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
