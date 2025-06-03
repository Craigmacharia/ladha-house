import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTools, FaClock, FaMoneyBillWave, FaArrowLeft, FaStar, FaWifi, FaConciergeBell, FaParking, FaSpa } from "react-icons/fa";
import { GiMeal, GiLaurelsTrophy } from "react-icons/gi";

const API_URL = "https://ladha-house-1.onrender.com/api";

function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/`);
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      fetchServices();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const amenitiesIcons = {
    wifi: <FaWifi className="me-1" />,
    concierge: <FaConciergeBell className="me-1" />,
    parking: <FaParking className="me-1" />,
    spa: <FaSpa className="me-1" />,
    dining: <GiMeal className="me-1" />,
    premium: <GiLaurelsTrophy className="me-1" />
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div 
          className="spinner-grow" 
          style={{ 
            width: '3rem', 
            height: '3rem', 
            color: '#8d6e63' 
          }} 
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p 
          className="mt-3 fs-5 animate-pulse" 
          style={{ color: '#5d4037' }}
        >
          Loading our premium services...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 animate-fade-in">
        <div 
          className="alert alert-danger shadow-sm" 
          role="alert"
          style={{ 
            backgroundColor: '#efebe9', 
            borderLeft: '4px solid #d32f2f', 
            color: '#5d4037',
            animation: 'shake 0.5s ease-in-out'
          }}
        >
          {error}
        </div>
        <button 
          className="btn shadow-sm hover-effect"
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#8d6e63',
            color: 'white',
            border: 'none',
            padding: '10px 20px'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div 
      className="container py-5 animate-fade-in" 
      style={{ maxWidth: '1200px' }}
    >
      <h1 
        className="text-center mb-5" 
        style={{ 
          color: '#5d4037', 
          fontWeight: '600',
          position: 'relative',
          display: 'inline-block',
          margin: '0 auto'
        }}
      >
        <FaTools className="me-2" />
        <span className="title-underline">Our Services</span>
      </h1>

      <button 
        className="btn mb-4 d-flex align-items-center hover-effect"
        onClick={() => navigate('/')}
        style={{
          backgroundColor: 'transparent',
          color: '#5d4037',
          border: '1px solid #8d6e63',
          transition: 'all 0.3s ease',
          padding: '8px 16px'
        }}
      >
        <FaArrowLeft className="me-2" />
        Back Home
      </button>

      {services.length === 0 ? (
        <div 
          className="alert shadow-sm animate-bounce-in"
          style={{ 
            backgroundColor: '#efebe9', 
            borderLeft: '4px solid #8d6e63',
            color: '#5d4037',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          No services available at the moment. Please check back later.
        </div>
      ) : (
        <div className="row g-4">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="col-md-6 col-lg-4 animate-stagger"
              style={{ animationDelay: `${services.indexOf(service) * 0.1}s` }}
            >
              <div 
                className="card h-100 shadow-sm border-0 hover-effect"
                style={{ 
                  transition: 'all 0.3s ease',
                  borderBottom: '4px solid #8d6e63',
                  transform: hoveredService === service.id ? 'translateY(-5px)' : 'none'
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 
                      className="card-title mb-0"
                      style={{ color: '#5d4037' }}
                    >
                      {service.name}
                    </h5>
                    {service.is_premium && (
                      <div 
                        className="badge bg-warning text-dark shadow-sm"
                        style={{
                          transform: 'rotate(15deg)',
                          animation: 'pulse 2s infinite'
                        }}
                      >
                        <FaStar className="me-1" /> Premium
                      </div>
                    )}
                  </div>
                  
                  <p 
                    className="card-text flex-grow-1"
                    style={{ color: '#6d4c41' }}
                  >
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="d-flex align-items-center mb-2">
                      <FaMoneyBillWave className="me-2" style={{ color: '#8d6e63', minWidth: '20px' }} />
                      <span style={{ color: '#5d4037' }}>
                        KES {parseFloat(service.price).toFixed(2)}
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <FaClock className="me-2" style={{ color: '#8d6e63', minWidth: '20px' }} />
                      <span style={{ color: '#5d4037' }}>
                        {service.duration_minutes} minutes
                      </span>
                    </li>
                  </ul>

                  {/* Amenities */}
                  {service.amenities && service.amenities.length > 0 && (
                    <div className="mb-3">
                      <small className="d-block text-muted mb-1">Includes:</small>
                      <div className="d-flex flex-wrap gap-2">
                        {service.amenities.map((amenity, index) => (
                          <span 
                            key={index} 
                            className="badge"
                            style={{ 
                              backgroundColor: '#efebe9',
                              color: '#5d4037',
                              fontWeight: 'normal'
                            }}
                          >
                            {amenitiesIcons[amenity] || ''} {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn shadow-sm pulse-on-hover mt-auto"
                    onClick={() => navigate(`/book-service/${service.id}`, { state: { service } })}
                    style={{
                      backgroundColor: '#8d6e63',
                      color: 'white',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      padding: '8px 16px'
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes bounceIn {
          0% { 
            opacity: 0;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
          100% { 
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-stagger {
          opacity: 0;
          animation: slideUp 0.5s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .hover-effect:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .pulse-on-hover:hover {
          animation: pulse 0.5s ease;
        }
        .title-underline {
          position: relative;
        }
        .title-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #8d6e63, #5d4037);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s ease;
        }
        .title-underline:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </div>
  );
}

export default Services;
