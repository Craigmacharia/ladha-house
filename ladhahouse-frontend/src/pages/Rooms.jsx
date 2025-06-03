import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBed, FaMoneyBillWave, FaUsers, FaStar, FaWifi, FaTv, FaCoffee, FaSwimmingPool } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";

const API_BASE_URL = "https://ladha-house-1.onrender.com";


function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/rooms/`);
        setRooms(response.data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      fetchRooms();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x200?text=No+Image";
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  };

  const handleBookNow = (room) => {
    navigate(`/book/${room.id}`, { state: { room } });
  };

  const amenitiesIcons = {
    wifi: <FaWifi className="me-1" />,
    tv: <FaTv className="me-1" />,
    breakfast: <GiMeal className="me-1" />,
    pool: <FaSwimmingPool className="me-1" />,
    coffee: <FaCoffee className="me-1" />
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
          Loading our luxurious rooms...
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
        <span className="title-underline">Our Rooms</span>
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

      {rooms.length === 0 ? (
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
          No rooms available at the moment. Please check back later.
        </div>
      ) : (
        <div className="row g-4">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="col-md-6 col-lg-4 animate-stagger"
              style={{ animationDelay: `${rooms.indexOf(room) * 0.1}s` }}
            >
              <div 
                className="card h-100 shadow-sm border-0 hover-effect"
                style={{ 
                  transition: 'all 0.3s ease',
                  borderBottom: '4px solid #8d6e63',
                  transform: hoveredRoom === room.id ? 'translateY(-5px)' : 'none'
                }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div className="position-relative overflow-hidden">
                  <img
                    src={getImageUrl(room.image)}
                    className="card-img-top img-zoom"
                    alt={room.name}
                    style={{ 
                      height: "250px", 
                      objectFit: "cover",
                      borderBottom: '1px solid #d7ccc8',
                      transition: 'transform 0.5s ease'
                    }}
                    loading="lazy"
                  />
                  {room.is_featured && (
                    <div 
                      className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark shadow-sm"
                      style={{
                        transform: 'rotate(15deg)',
                        animation: 'pulse 2s infinite'
                      }}
                    >
                      <FaStar className="me-1" /> Featured
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 
                    className="card-title d-flex align-items-center"
                    style={{ color: '#5d4037' }}
                  >
                    <FaBed className="me-2" style={{ color: '#8d6e63' }} />
                    {room.name}
                  </h5>
                  <p 
                    className="card-text flex-grow-1"
                    style={{ color: '#6d4c41' }}
                  >
                    {room.description}
                  </p>
                  
                  {/* Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="mb-3">
                      <small className="d-block text-muted mb-1">Amenities:</small>
                      <div className="d-flex flex-wrap gap-2">
                        {room.amenities.map((amenity, index) => (
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

                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                    <div>
                      <span 
                        className="h5 mb-0 d-flex align-items-center"
                        style={{ color: '#5d4037' }}
                      >
                        <FaMoneyBillWave className="me-2" style={{ color: '#8d6e63' }} />
                        ${room.price}
                        <small className="text-muted ms-1">/night</small>
                      </span>
                      {room.capacity && (
                        <small className="d-flex align-items-center mt-1" style={{ color: '#6d4c41' }}>
                          <FaUsers className="me-1" style={{ color: '#8d6e63' }} />
                          {room.capacity} guests
                        </small>
                      )}
                    </div>
                    <button
                      className="btn shadow-sm pulse-on-hover"
                      onClick={() => handleBookNow(room)}
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
        .img-zoom {
          transition: transform 0.5s ease;
        }
        .img-zoom:hover {
          transform: scale(1.05);
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

export default Rooms;