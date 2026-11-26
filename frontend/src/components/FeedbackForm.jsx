// 14. Feedback / Review Form - Customer
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function FeedbackForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/feedback', data)
      alert(result.message || 'Feedback submitted!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Feedback / Review</h3>
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
            <label className="form-label">Rating</label>
            <select className="form-select" {...register('rating')}>
              <option value="">Select Rating</option>
              <option>5 Stars - Excellent</option>
              <option>4 Stars - Very Good</option>
              <option>3 Stars - Good</option>
              <option>2 Stars - Average</option>
              <option>1 Star - Poor</option>
            </select>
            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Your Review</label>
            <textarea className="form-control" rows="4" placeholder="Write your review" {...register('review')}></textarea>
            {errors.review && <p className="text-danger">{errors.review.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
        </form>
      </div>
    </div>
  )
}

export default FeedbackForm
