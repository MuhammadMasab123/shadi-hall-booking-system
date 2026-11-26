// 7. Payment Form - Customer
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema } from '../validation/schemas.js'
import { submitForm } from '../api.js'

function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
  })
  const onSubmit = async (data) => {
    try {
      const result = await submitForm('/api/payments', data)
      alert(result.message || 'Payment successful!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="text-center mb-4">Payment Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select className="form-select" {...register('method')}>
              <option value="">Select Payment Method</option>
              <option>JazzCash</option>
              <option>Easypaisa</option>
              <option>Bank Card</option>
              <option>Cash on Booking</option>
            </select>
            {errors.method && <p className="text-danger">{errors.method.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Card / Account Number</label>
            <input type="text" className="form-control" placeholder="Enter number" {...register('accountNumber')} />
            {errors.accountNumber && <p className="text-danger">{errors.accountNumber.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Amount (Rs.)</label>
            <input type="number" className="form-control" placeholder="e.g. 50000" {...register('amount')} />
            {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
          </div>
          <button type="submit" className="btn btn-success w-100">Pay Now</button>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm
