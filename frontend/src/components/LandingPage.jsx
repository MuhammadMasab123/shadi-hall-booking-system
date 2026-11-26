// Landing Page - Navbar, Carousel, Hall Cards, Services
// Navbar mein "Forms" link hai, click karne se #forms section pe chala jata hai.
function LandingPage() {
  const halls = [
    { name: 'Royal Palace Hall', price: 'Rs. 150,000 / event', capacity: '500 Guests', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800' },
    { name: 'Mehfil Marquee', price: 'Rs. 100,000 / event', capacity: '300 Guests', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800' },
    { name: 'Noor Banquet Hall', price: 'Rs. 200,000 / event', capacity: '800 Guests', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800' },
    { name: 'Garden View Hall', price: 'Rs. 120,000 / event', capacity: '400 Guests', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800' },
  ]

  return (
    <div>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-danger" href="#home">Shadi<span className="text-warning">Hall</span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#halls">Halls</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#forms">Forms</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
            <a href="#forms" className="btn btn-danger ms-3">Book Now</a>
          </div>
        </div>
      </nav>

      {/* ===== CAROUSEL ===== */}
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600" className="d-block w-100" alt="Wedding Hall" style={{ height: '450px', objectFit: 'cover' }} />
            <div className="carousel-caption">
              <h2>Your Dream Wedding Starts Here</h2>
              <p>Book the perfect hall for your special day</p>
              <a href="#halls" className="btn btn-danger">Explore Halls</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600" className="d-block w-100" alt="Luxury Hall" style={{ height: '450px', objectFit: 'cover' }} />
            <div className="carousel-caption">
              <h2>Luxury Halls &amp; Best Catering</h2>
              <p>Beautiful decoration, delicious food and great service</p>
              <a href="#halls" className="btn btn-danger">Explore Halls</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600" className="d-block w-100" alt="Easy Booking" style={{ height: '450px', objectFit: 'cover' }} />
            <div className="carousel-caption">
              <h2>Easy Online Booking</h2>
              <p>Check date, pick your hall and book in minutes</p>
              <a href="#forms" className="btn btn-danger">Book Now</a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ===== HALL CARDS ===== */}
      <section id="halls" className="py-5 text-center">
        <div className="container">
          <h2 className="text-danger">Our Popular Halls</h2>
          <p className="text-muted mb-4">Choose a hall that fits your guests and your budget</p>
          <div className="row g-4">
            {halls.map((hall, index) => (
              <div className="col-md-3" key={index}>
                <div className="card h-100 text-start">
                  <img src={hall.img} className="card-img-top" alt={hall.name} style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{hall.name}</h5>
                    <p className="text-danger fw-bold">{hall.price}</p>
                    <p className="text-muted">Capacity: {hall.capacity}</p>
                    <p className="text-muted">Location: Abbottabad</p>
                    <a href="#forms" className="btn btn-danger">Book Hall</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="text-danger mb-4">Our Services</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-4"><h5 className="text-danger">Catering</h5><p>Delicious Pakistani and continental food for your guests.</p></div>
            </div>
            <div className="col-md-4">
              <div className="card p-4"><h5 className="text-danger">Decoration</h5><p>Beautiful stage, flowers and lighting for your event.</p></div>
            </div>
            <div className="col-md-4">
              <div className="card p-4"><h5 className="text-danger">Photography</h5><p>Professional photos and videos of your special day.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-dark text-white text-center py-4">
        <p>Shadi Hall Booking System</p>
        <p>Abbottabad, Pakistan | Email: info@shadihall.com | Phone: 0335-0000000</p>
        <p>&copy; 2026 Shadi Hall Booking System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
