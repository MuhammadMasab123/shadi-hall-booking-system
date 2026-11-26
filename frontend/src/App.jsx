import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage.jsx'
import ManageData from './components/ManageData.jsx'
import { getLoggedInUser } from './api.js'
import SignupForm from './components/SignupForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import ForgotPasswordForm from './components/ForgotPasswordForm.jsx'
import SearchHallForm from './components/SearchHallForm.jsx'
import AvailabilityCheckForm from './components/AvailabilityCheckForm.jsx'
import BookingForm from './components/BookingForm.jsx'
import PaymentForm from './components/PaymentForm.jsx'
import AddHallForm from './components/AddHallForm.jsx'
import EditHallForm from './components/EditHallForm.jsx'
import AddServiceForm from './components/AddServiceForm.jsx'
import ProfileUpdateForm from './components/ProfileUpdateForm.jsx'
import ChangePasswordForm from './components/ChangePasswordForm.jsx'
import ContactForm from './components/ContactForm.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'

// Simple list of all 14 forms. Click a button to show that form.
const forms = [
  { name: 'Signup Form', component: <SignupForm /> },
  { name: 'Login Form', component: <LoginForm /> },
  { name: 'Forgot Password Form', component: <ForgotPasswordForm /> },
  { name: 'Search Hall Form', component: <SearchHallForm /> },
  { name: 'Availability Check Form', component: <AvailabilityCheckForm /> },
  { name: 'Booking Form', component: <BookingForm /> },
  { name: 'Payment Form', component: <PaymentForm /> },
  { name: 'Add Hall Form', component: <AddHallForm /> },
  { name: 'Edit Hall Form', component: <EditHallForm /> },
  { name: 'Add Service / Package Form', component: <AddServiceForm /> },
  { name: 'Profile Update Form', component: <ProfileUpdateForm /> },
  { name: 'Change Password Form', component: <ChangePasswordForm /> },
  { name: 'Contact Us Form', component: <ContactForm /> },
  { name: 'Feedback / Review Form', component: <FeedbackForm /> },
]

function App() {
  const [selected, setSelected] = useState(0)
  const [showManage, setShowManage] = useState(false)
  // Logged-in user ka role - Login ke baad update hota rehta hai
  const [user, setUser] = useState(getLoggedInUser())
  useEffect(() => {
    const timer = setInterval(() => setUser(getLoggedInUser()), 1000)
    return () => clearInterval(timer)
  }, [])
  // Manage Data sirf Admin aur Hall Manager ko dikhega, Customer ko nahi
  const canManage = user && (user.role === 'Admin' || user.role === 'Hall Manager')

  return (
    <div>
      {/* Landing Page: Navbar, Carousel, Hall Cards, Services, Footer */}
      <LandingPage />

      {/* Manage Data button - sirf Admin aur Hall Manager ko dikhta hai */}
      {canManage && (
        <div className="container mt-4 text-center">
          <button className="btn btn-dark" onClick={() => setShowManage(!showManage)}>
            {showManage ? 'Hide Manage Data' : 'Manage Data (View / Edit / Delete)'}
          </button>
        </div>
      )}

      {showManage && canManage && <ManageData />}

      {/* Forms Section - Navbar mein "Forms" pe click karne se yahan aata hai */}
      <section id="forms" className="container mt-5 mb-5">
        <h2 className="text-center mb-4">All Forms</h2>
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {forms.map((form, index) => (
            <button
              key={index}
              className={index === selected ? 'btn btn-primary' : 'btn btn-outline-primary'}
              onClick={() => setSelected(index)}
            >
              {index + 1}. {form.name}
            </button>
          ))}
        </div>
        {forms[selected].component}
      </section>
    </div>
  )
}

export default App
