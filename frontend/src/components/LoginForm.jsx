// 2. Login Form - Admin, Customer, Hall Manager
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validation/schemas.js'
import { submitForm, saveToken, getLoggedInUser, logout } from '../api.js'

function LoginForm() {
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser())
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/auth/login', data)
      // Token save karo - ab Booking, Payment, Manage Data sab is token se chalenge
      if (result.token) saveToken(result.token, result.user)
      setLoggedInUser(result.user)
      alert(result.message || 'Login successful!')
    } catch (err) {
      alert(err.message)
    }
  }
  const onLogout = () => {
    logout()
    setLoggedInUser(null)
    alert('Logged out - token removed')
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Login Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" {...register('password')} />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Login As</label>
            <select className="form-select" {...register('role')}>
              <option value="">Select Role</option>
              <option>Admin</option>
              <option>Customer</option>
              <option>Hall Manager</option>
            </select>
            {errors.role && <p className="text-danger">{errors.role.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {loggedInUser && (
          <div className="alert alert-success mt-3 mb-0">
            Logged in as <strong>{loggedInUser.email}</strong> ({loggedInUser.role || 'Customer'})
            <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm
