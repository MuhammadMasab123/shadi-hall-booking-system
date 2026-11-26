// 13. Contact Us Form - Customer
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/contact', data)
      alert(result.message || 'Message sent!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Contact Us</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" {...register('name')} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register('email')} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Write your message" {...register('message')}></textarea>
            {errors.message && <p className="text-danger">{errors.message.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
