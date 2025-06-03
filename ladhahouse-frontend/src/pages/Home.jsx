import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const texts = ["Comfort", "Luxury", "Style", "Hospitality"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow images
  const slides = [
    {
      image: "https://bing.com/th/id/BCO.7800a858-81ba-40d6-96ef-b32e57b80ff5.png",
      alt: "Luxury hotel room"
    },
    {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Hotel lobby"
    },
    {
      image: "https://tse2.mm.bing.net/th?id=OIG3.x7Wpt1w6YIYy82Q1kz7M&pid=ImgGn",
      alt: "Hotel restaurant"
    },
    {
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Hotel pool area"
    }
  ];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= texts[currentIndex].length) {
        setTypedText(texts[currentIndex].substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
          el.style.opacity = 1;
        }
      });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-brown" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="mt-3" style={{ color: '#5d4037' }}>Welcome to LadhaHouse</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" style={{ zIndex: 1030 }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: '#5d4037' }}>
            Ladha<span style={{ color: '#8d6e63' }}>House</span>
            <img src="ladhalogo.jpg" width={40} height={40} alt="LadhaHouse Logo" className="ms-2" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
            aria-expanded="false"
            aria-controls="navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active fw-medium px-3" to="/" style={{ color: '#5d4037' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/rooms" style={{ color: '#5d4037' }}>Rooms</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/book" style={{ color: '#5d4037' }}>BookNow</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/contact" style={{ color: '#5d4037' }}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/booking-summary" style={{ color: '#5d4037' }}>YourBookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/login" style={{ color: '#5d4037' }}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/register" style={{ color: '#5d4037' }}>Register</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/services" style={{ color: '#5d4037' }}>Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/menu" style={{ color: '#5d4037' }}>Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/team" style={{ color: '#5d4037' }}>Team</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slideshow */}
      <header className="hero-section" style={{ 
        paddingTop: '80px', 
        paddingBottom: '80px',
        position: 'relative',
        height: '80vh',
        overflow: 'hidden'
      }}>
        {/* Slideshow Images */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slideshow-image ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
            aria-hidden={index !== currentSlide}
          />
        ))}
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}></div>
        
        {/* Content */}
        <div className="container h-100 d-flex align-items-center justify-content-center position-relative" style={{ zIndex: 1 }}>
          <div className="text-center text-white">
            <h1 className="display-4 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Experience <span style={{ color: '#8d6e63' }}>{typedText}</span> at LadhaHouse
            </h1>
            <p className="lead fs-4 mb-5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Premium comfort, affordability, and style in the heart of the city.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/book" className="btn btn-lg px-4 py-3 fw-bold pulse-animation" style={{ 
                backgroundColor: '#8d6e63', 
                color: 'white',
                border: 'none',
                transition: 'all 0.3s ease'
              }}>
                Book a Room
              </Link>
              <Link to="/menu" className="btn btn-lg px-4 py-3 fw-bold" style={{ 
                backgroundColor: 'transparent', 
                color: 'white',
                border: '2px solid white',
                transition: 'all 0.3s ease'
              }}>
                View Menu
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center mb-4" style={{ zIndex: 2 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`mx-1 p-0 border-0 rounded-circle`}
              style={{
                width: '12px',
                height: '12px',
                cursor: 'pointer',
                backgroundColor: index === currentSlide ? '#8d6e63' : 'rgba(255,255,255,0.5)'
              }}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </header>
<br></br>
<br></br>
<br></br>
      {/* Weather Widget */}
      <div className="container mt-n5" style={{ zIndex: 2 }}>
        <div className="card border-0 shadow-sm mx-auto" style={{ 
          maxWidth: '300px', 
          backgroundColor: '#efebe9',
          borderRadius: '15px'
        }}>
          <div className="card-body text-center">
            <h5 className="card-title" style={{ color: '#5d4037' }}>Current Weather in Nanyuki</h5>
            <div className="d-flex justify-content-center align-items-center">
              <i className="bi bi-cloud-sun-fill display-4 me-3" style={{ color: '#8d6e63' }}></i>
              <div>
                <h2 className="mb-0" style={{ color: '#5d4037' }}>20°C</h2>
                <small className="text-muted">Partly Cloudy</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="text-center mb-5 animate-on-scroll">
            <h2 className="display-6 fw-bold mb-3" style={{ color: '#5d4037' }}>Why Choose LadhaHouse?</h2>
            <p className="lead mx-auto" style={{maxWidth: '600px', color: '#8d6e63'}}>
              We provide exceptional hospitality with attention to every detail
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "bi bi-house-door-fill",
                title: "Modern Rooms",
                text: "Beautifully designed rooms with premium amenities, comfortable beds, and elegant decor."
              },
              {
                icon: "bi bi-wifi",
                title: "Free High-Speed Wi-Fi",
                text: "Stay connected with our blazing-fast internet available throughout the property."
              },
              {
                icon: "bi bi-emoji-smile-fill",
                title: "Exceptional Service",
                text: "Our dedicated team is committed to making your stay perfect in every way."
              }
            ].map((feature, index) => (
              <div key={index} className={`col-md-4 animate-on-scroll delay-${index}`}>
                <div className="card h-100 border-0 shadow-sm p-4 hover-effect" style={{ borderBottom: '4px solid #8d6e63' }}>
                  <div className="card-body text-center">
                    <i className={`${feature.icon} display-4 mb-3`} style={{ color: '#8d6e63' }}></i>
                    <h5 className="card-title fw-bold" style={{ color: '#5d4037' }}>{feature.title}</h5>
                    <p className="card-text" style={{ color: '#6d4c41' }}>
                      {feature.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section 
        className="py-5 d-flex align-items-center justify-content-center" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(93, 64, 55, 0.7)'
        }}></div>
        <div className="container position-relative text-center text-white">
          <h2 className="display-5 fw-bold mb-4 animate-on-scroll">Unmatched Comfort</h2>
          <p className="lead mb-5 animate-on-scroll delay-1">Experience the perfect blend of modern amenities and warm hospitality</p>
          <Link to="/rooms" className="btn btn-lg px-4 py-3 fw-bold animate-on-scroll delay-2" style={{ 
            backgroundColor: '#8d6e63', 
            color: 'white',
            border: 'none'
          }}>
            View Our Rooms
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 animate-on-scroll" style={{ color: '#5d4037' }}>Explore LadhaHouse<p>Tembea Kenya</p></h2>
    
          <div className="row g-3 gallery-grid">
            {[
              
              "golf.png",
              "karts.png",
              "paint.png",
              "th (6).jpeg",
              "penthouse.png",
              "double2.png",
              "deluxe3.png",
              "slide3.jpg",
        
            ].map((img, index) => (
              <div key={index} className={`col-md-4 col-6 gallery-item animate-on-scroll delay-${index % 3}`}>
                <img 
                  src={img} 
                  alt={`LadhaHouse ${index+1}`} 
                  className="img-fluid rounded-3 shadow-sm"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onClick={() => window.open(img, '_blank')}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <h2 className="text-center mb-5 animate-on-scroll" style={{ color: '#5d4037' }}>What Our Guests Say</h2>
          
          <div className="position-relative">
            <div 
              id="testimonialCarousel" 
              className="carousel slide" 
              data-bs-ride="carousel"
              style={{ padding: '0 40px' }}
            >
              <div className="carousel-indicators mb-0">
                {[0, 1, 2].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : "false"}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#8d6e63' : '#d7ccc8',
                      border: 'none',
                      margin: '0 5px'
                    }}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner pb-4">
                {[
                  {
                    rating: 4.5,
                    quote: "The rooms are spacious and clean, with comfortable beds. The staff went above and beyond to make our stay.",
                    name: "Olima Ja'Prado.Snr",
                    role: "Business Traveler",
                    image: "https://tse1.mm.bing.net/th?id=OIG2.DpvxPTVMf2PFYwd4brSW&pid=ImgGn"
                  },
                  {
                    rating: 5,
                    quote: "Excellent location and amazing service. The Wi-Fi was fast and reliable, which was important for my work.",
                    name: "Lucille Adhiambo",
                    role: "Digital Nomad",
                    image: "https://tse4.mm.bing.net/th?id=OIG1.a9YprJn3kX8DhJ9cpqgT&cb=iwp1&pid=ImgGn"
                  },
                  {
                    rating: 4,
                    quote: "Perfect for family vacations. The kids loved it and we appreciated the cleanliness and attention to detail.",
                    name: "The Kasongo Family",
                    role: "Family Vacation",
                    image: "https://tse3.mm.bing.net/th?id=OIG1.QVCyYGjhGp2vxt21UXGm&cb=iwc1&pid=ImgGn"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  >
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <div className="card border-0 p-4" style={{ backgroundColor: 'white' }}>
                          <div className="card-body text-center">
                            <div className="mb-3 text-warning">
                              {[...Array(5)].map((_, i) => (
                                <i 
                                  key={i} 
                                  className={`bi bi-star${i < Math.floor(testimonial.rating) ? '-fill' : i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0 ? '-half' : ''}`}
                                ></i>
                              ))}
                            </div>
                            <p 
                              className="card-text fst-italic mb-4 fs-5" 
                              style={{ color: '#5d4037', minHeight: '100px' }}
                            >
                              "{testimonial.quote}"
                            </p>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="me-3">
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.name}
                                  className="rounded-circle"
                                  style={{
                                    width: '60px', 
                                    height: '60px', 
                                    objectFit: 'cover',
                                    border: '2px solid #8d6e63'
                                  }}
                                />
                              </div>
                              <div className="text-start">
                                <h6 className="mb-0 fw-bold" style={{ color: '#5d4037' }}>
                                  {testimonial.name}
                                </h6>
                                <small className="text-muted">{testimonial.role}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#testimonialCarousel" 
                data-bs-slide="prev"
                style={{ width: '40px', left: '-20px' }}
              >
                <span 
                  className="carousel-control-prev-icon" 
                  aria-hidden="true"
                  style={{ 
                    backgroundColor: '#8d6e63',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundSize: '60%'
                  }}
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#testimonialCarousel" 
                data-bs-slide="next"
                style={{ width: '40px', right: '-20px' }}
              >
                <span 
                  className="carousel-control-next-icon" 
                  aria-hidden="true"
                  style={{ 
                    backgroundColor: '#8d6e63',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundSize: '60%'
                  }}
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5" style={{ backgroundColor: '#5d4037' }}>
        <div className="container text-center py-4">
          <h2 className="display-6 fw-bold mb-4 text-white animate-on-scroll">Ready for an Unforgettable Stay?</h2>
          <Link to="/menu" className="btn btn-lg px-5 py-3 fw-bold hover-effect animate-on-scroll delay-1" style={{ 
              backgroundColor: '#8d6e63', 
              color: 'white',
              border: 'none'
            }}>
            LADHAHOUSE MENU
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 mt-auto" style={{ backgroundColor: '#3e2723' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3 text-white">LadhaHouse</h5>
              <hr style={{ borderColor: '#8d6e63' }}></hr>
              <p className="text-white-50">
                Providing exceptional hospitality with premium accommodations at affordable prices.
              </p>
              <img src="ladhalogo.jpg" width={"100px"} height={"100px"} alt="LadhaHouse Logo" className="mb-3"/>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3 text-white">Quick Links</h5>
              <hr style={{ borderColor: '#8d6e63' }}></hr>
              <ul className="list-unstyled">
                {[
                  { path: "/", label: "Home" },
                  { path: "/rooms", label: "Rooms" },
                  { path: "/book", label: "Book Now" },
                  { path: "/contact", label: "Contact Us" },
                  { path: "/recipes", label: "Healthy Recipes" },
                  { path: "/services", label: "Services" },
                  { path: "/my-service-bookings", label: "Huduma" },
                  { path: "/service-summary", label: "ServicesSummary" }
                ].map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link to={link.path} className="text-white-50 text-decoration-none hover-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold mb-3 text-white">Contact Info</h5>
              <hr style={{ borderColor: '#8d6e63' }}></hr>
              <ul className="list-unstyled text-white-50">
                <li className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i> 254 Naromoru, Nanyuki City</li>
                <li className="mb-2"><i className="bi bi-telephone-fill me-2"></i> +254 11 092 8039</li>
                <li className="mb-2"><i className="bi bi-envelope-fill me-2"></i> info@ladhahouse.com</li>
                <li className="d-flex gap-3 mt-3">
                  <a href="#" className="text-white-50"><i className="bi bi-facebook fs-4"></i></a>
                  <a href="#" className="text-white-50"><i className="bi bi-instagram fs-4"></i></a>
                  <a href="#" className="text-white-50"><i className="bi bi-twitter-x fs-4"></i></a>
                  <a href="#" className="text-white-50"><i className="bi bi-linkedin fs-4"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <p className="mb-0 text-white-50">
              &copy; {currentYear} LadhaHouse. All rights reserved. | 
              <Link to="/privacy" className="text-white-50 ms-2 text-decoration-none hover-underline">Privacy Policy</Link> | 
              <Link to="/terms" className="text-white-50 ms-2 text-decoration-none hover-underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a 
        href="https://wa.me/254755453975" 
        target="_blank" 
        rel="noopener noreferrer"
        className="position-fixed bottom-0 end-0 m-4 pulse-animation"
        style={{
          backgroundColor: '#25D366',
          color: 'white',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      <style jsx>{`
        .hero-section {
          transition: background-image 1s ease-in-out;
        }
        .slideshow-image {
          transition: opacity 1s ease-in-out;
        }
        .slideshow-image.active {
          opacity: 1;
        }
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .hover-underline:hover {
          text-decoration: underline;
        }
        .btn:hover {
          background-color: #6d4c41 !important;
          transform: translateY(-2px);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 1s forwards;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        .gallery-item img:hover {
          transform: scale(1.03) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;