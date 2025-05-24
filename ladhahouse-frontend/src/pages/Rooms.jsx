import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBed, FaMoneyBillWave, FaUsers, FaStar, FaWifi, FaTv, FaCoffee, FaSwimmingPool, FaSearch, FaFilter } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";

const API_BASE_URL = "http://localhost:8000";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Available amenities for filtering
  const allAmenities = [
    { id: 'wifi', name: 'WiFi', icon: <FaWifi /> },
    { id: 'tv', name: 'TV', icon: <FaTv /> },
    { id: 'breakfast', name: 'Breakfast', icon: <GiMeal /> },
    { id: 'pool', name: 'Pool', icon: <FaSwimmingPool /> },
    { id: 'coffee', name: 'Coffee', icon: <FaCoffee /> }
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/rooms/`);
        setRooms(response.data);
        setFilteredRooms(response.data); // Initialize filtered rooms with all rooms
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchRooms();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter rooms based on search term, price range, and amenities
  useEffect(() => {
    const results = rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
      const matchesAmenities = selectedAmenities.length === 0 || 
                             (room.amenities && selectedAmenities.every(a => room.amenities.includes(a)));
      
      return matchesSearch && matchesPrice && matchesAmenities;
    });
    setFilteredRooms(results);
  }, [searchTerm, priceRange, selectedAmenities, rooms]);

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

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
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

      {/* Search and Filter Section */}
      <div className="mb-4">
        {/* Enhanced Search Bar */}
        <div className="input-group mb-3">
          <span 
            className="input-group-text" 
            style={{ 
              backgroundColor: '#efebe9',
              borderColor: '#d7ccc8',
              color: '#8d6e63'
            }}
          >
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search rooms by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              backgroundColor: '#efebe9',
              borderColor: '#d7ccc8',
              color: '#5d4037'
            }}
          />
          <button
            className="btn"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: '#efebe9',
              borderColor: '#d7ccc8',
              color: '#5d4037'
            }}
          >
            <FaFilter className="me-1" />
            Filters
          </button>
          {(searchTerm || priceRange[1] < 1000 || selectedAmenities.length > 0) && (
            <button
              className="btn"
              onClick={resetFilters}
              style={{
                backgroundColor: '#efebe9',
                borderColor: '#d7ccc8',
                color: '#8d6e63'
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div 
            className="card p-3 mb-3 border-0 shadow-sm"
            style={{ 
              backgroundColor: '#f5f0eb',
              borderBottom: '3px solid #8d6e63'
            }}
          >
            <div className="row g-3">
              {/* Price Range Filter */}
              <div className="col-md-6">
                <div>
                  <label className="form-label d-block mb-2" style={{ color: '#5d4037' }}>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: '100px' }}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      min="0"
                    />
                    <input
                      type="range"
                      className="form-range flex-grow-1"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      style={{ accentColor: '#8d6e63' }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: '100px' }}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      max="1000"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="col-md-6">
                <label className="form-label d-block mb-2" style={{ color: '#5d4037' }}>
                  Amenities:
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {allAmenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      type="button"
                      className={`btn btn-sm d-flex align-items-center ${selectedAmenities.includes(amenity.id) ? 'active' : ''}`}
                      onClick={() => toggleAmenity(amenity.id)}
                      style={{
                        backgroundColor: selectedAmenities.includes(amenity.id) ? '#8d6e63' : '#efebe9',
                        color: selectedAmenities.includes(amenity.id) ? 'white' : '#5d4037',
                        border: `1px solid ${selectedAmenities.includes(amenity.id) ? '#8d6e63' : '#d7ccc8'}`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {amenity.icon}
                      <span className="ms-1">{amenity.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div style={{ color: '#6d4c41' }}>
          Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}
          {filteredRooms.length !== rooms.length && ` (of ${rooms.length})`}
        </div>
        {filteredRooms.length !== rooms.length && (
          <button
            className="btn btn-sm"
            onClick={resetFilters}
            style={{
              backgroundColor: 'transparent',
              color: '#8d6e63',
              border: '1px solid #8d6e63'
            }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {filteredRooms.length === 0 ? (
        <div 
          className="alert shadow-sm animate-bounce-in text-center py-4"
          style={{ 
            backgroundColor: '#efebe9', 
            borderLeft: '4px solid #8d6e63',
            color: '#5d4037',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <h5 className="mb-3">No rooms match your search</h5>
          <button
            className="btn btn-sm"
            onClick={resetFilters}
            style={{
              backgroundColor: '#8d6e63',
              color: 'white'
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredRooms.map((room) => (
            <div 
              key={room.id} 
              className="col-md-6 col-lg-4 animate-stagger"
              style={{ animationDelay: `${filteredRooms.indexOf(room) * 0.1}s` }}
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
        .form-control:focus {
          border-color: #8d6e63;
          box-shadow: 0 0 0 0.2rem rgba(141, 110, 99, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Rooms;