import { z } from 'zod'

// Shared rules
const phoneRule = z.string().regex(/^03\d{9}$/, 'Phone number must be in 03xx-xxxxxxx format')
const emailRule = z.string().email('Enter a valid email')

// 1. Signup Form
export const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: emailRule,
  phone: phoneRule,
  userType: z.string().min(1, 'Please select a user type'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// 2. Login Form
export const loginSchema = z.object({
  email: emailRule,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Please select a role'),
})

// 3. Forgot Password Form
export const forgotPasswordSchema = z.object({
  email: emailRule,
})

// 4. Search Hall Form
export const searchHallSchema = z.object({
  location: z.string().optional(),
  guests: z.coerce.number().min(1, 'Guests must be at least 1').optional(),
  priceRange: z.string().optional(),
})

// 5. Availability Check Form
export const availabilitySchema = z.object({
  hall: z.string().min(1, 'Please select a hall'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
})

// 6. Booking Form
export const bookingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: phoneRule,
  hall: z.string().min(1, 'Please select a hall'),
  date: z.string().min(1, 'Please select a date'),
  guests: z.coerce.number().min(10, 'Guests must be at least 10').max(1000, 'Guests cannot be more than 1000'),
})

// 7. Payment Form
export const paymentSchema = z.object({
  method: z.string().min(1, 'Please select a payment method'),
  accountNumber: z.string().min(11, 'Account number must be at least 11 digits'),
  amount: z.coerce.number().min(1000, 'Amount must be at least Rs. 1000'),
})

// 8. Add Hall Form
export const addHallSchema = z.object({
  hallName: z.string().min(3, 'Hall name must be at least 3 characters'),
  location: z.string().min(3, 'Please enter a location'),
  capacity: z.coerce.number().min(50, 'Capacity must be at least 50'),
  price: z.coerce.number().min(10000, 'Price must be at least Rs. 10,000'),
})

// 9. Edit Hall Form
export const editHallSchema = z.object({
  hall: z.string().min(1, 'Please select a hall'),
  hallName: z.string().optional(),
  capacity: z.coerce.number().min(50, 'Capacity must be at least 50').optional(),
  price: z.coerce.number().min(10000, 'Price must be at least Rs. 10,000').optional(),
})

// 10. Add Service / Package Form
export const addServiceSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service'),
  packageName: z.string().min(3, 'Package name must be at least 3 characters'),
  price: z.coerce.number().min(1000, 'Price must be at least Rs. 1,000'),
  details: z.string().optional(),
})

// 11. Profile Update Form
export const profileSchema = z.object({
  email: emailRule,
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  phone: phoneRule.optional(),
  address: z.string().optional(),
})

// 12. Change Password Form
export const changePasswordSchema = z.object({
  email: emailRule,
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'New password and confirm password do not match',
  path: ['confirmPassword'],
})

// 13. Contact Us Form
export const contactSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: emailRule,
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// 14. Feedback / Review Form
export const feedbackSchema = z.object({
  hall: z.string().min(1, 'Please select a hall'),
  rating: z.string().min(1, 'Please select a rating'),
  review: z.string().min(10, 'Review must be at least 10 characters'),
})
