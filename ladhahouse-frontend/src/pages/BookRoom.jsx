import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaBed, 
  FaMoneyBillWave, 
  FaArrowLeft,
  FaUsers
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = "http://127.0.0.1:8000";
  // or the correct backend URL



const BookRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;
  const token = localStorage.getItem('token');
  
  const [fetchedRoom, setFetchedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRoomLoading, setIsRoomLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    check_in: '',
    check_out: ''
  });

  // Use the room from location or fetched room
  const displayRoom = room || fetchedRoom;

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location } });
    }
  }, [token, navigate, location]);

  useEffect(() => {
    if (!room) {
      setIsRoomLoading(true);
      axios.get(`${API_BASE_URL}/rooms/${roomId}/`)
        .then(res => {
          setFetchedRoom(res.data);
          setIsRoomLoading(false);
        })
        .catch(err => {
          console.error("Failed to load room", err);
          toast.error("Failed to load room details.");
          setIsRoomLoading(false);
        });
    }
  }, [room, roomId, setFetchedRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!form.full_name.trim()) errors.full_name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Valid email is required';
    if (!/^[\d\s+\-()]{10,20}$/.test(form.phone)) errors.phone = 'Please enter a valid phone number';
    if (!form.check_in) errors.check_in = 'Check-in date is required';
    if (!form.check_out) errors.check_out = 'Check-out date is required';
    
    if (form.check_in && form.check_out) {
      if (form.check_in >= form.check_out) {
        errors.check_out = 'Check-out must be after check-in';
      }
      
      if (form.check_in < today) {
        errors.check_in = 'Check-in cannot be in the past';
      }
      
      const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString().split('T')[0];
      if (form.check_in > maxDate || form.check_out > maxDate) {
        errors.check_out = 'Bookings can only be made up to 1 year in advance';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateNights = useCallback(() => {
    if (form.check_in && form.check_out) {
      const diff = new Date(form.check_out) - new Date(form.check_in);
      const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [form.check_in, form.check_out]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const bookingData = {
        room_id: roomId,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        check_in: form.check_in,
        check_out: form.check_out
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/bookings/`,   // ✅ Correct URL with /api/
        bookingData,
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    
        
    
      
      
      navigate('/booking-summary', { 
        state: { 
          booking: response.data, 
          room: displayRoom,
          nights: calculateNights(),
          total: (calculateNights() * parseFloat(displayRoom?.price || 0)).toFixed(2)
        } 
      });
    } catch (err) {
      console.error('Booking error:', err.response?.data);
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.detail ||
                         Object.values(err.response?.data || {}).flat().join(', ') ||
                         'Booking failed. Please check your information and try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!displayRoom || isRoomLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" style={{ color: '#8d6e63' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2" style={{ color: '#5d4037' }}>Loading room details...</span>
      </div>
    );
  }

  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString().split('T')[0];

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden" style={{ border: '1px solid #d7ccc8' }}>
              <div className="card-body p-4 p-md-5">
                <button 
                  onClick={() => navigate(-1)}
                  className="btn btn-outline-secondary mb-4 d-flex align-items-center"
                  type="button"
                  style={{ 
                    borderColor: '#8d6e63', 
                    color: '#5d4037',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Room
                </button>

                <div className="row">
                  <div className="col-md-5 mb-4 mb-md-0">
                    <div style={{ position: 'sticky', top: '20px' }}>
                      <h3 className="fw-bold mb-4" style={{ color: '#5d4037' }}>
                        <FaBed className="me-2" style={{ color: '#8d6e63' }} />
                        {displayRoom.name}
                      </h3>
                      
                      <img 
                        src={
                          displayRoom.image?.startsWith('http') 
                            ? displayRoom.image 
                            : displayRoom.image 
                              ? `${API_BASE_URL}${displayRoom.image}`
                              : 'https://via.placeholder.com/300x200?text=No+Image'
                        }
                        alt={displayRoom.name}
                        className="img-fluid rounded-3 mb-4"
                        style={{ 
                          height: '250px', 
                          width: '100%', 
                          objectFit: 'cover',
                          border: '1px solid #d7ccc8'
                        }}
                        loading="lazy"
                      />
                      
                      <div className="mb-3">
                        <h5 className="fw-semibold" style={{ color: '#5d4037' }}>Description</h5>
                        <p style={{ color: '#6d4c41' }}>{displayRoom.description}</p>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-semibold" style={{ color: '#5d4037' }}>Price per night:</span>
                          <div className="small d-flex align-items-center mt-1" style={{ color: '#6d4c41' }}>
                            <FaUsers className="me-1" style={{ color: '#8d6e63' }} />
                            Capacity: {displayRoom.capacity || 2} guests
                          </div>
                        </div>
                        <span 
                          className="badge fs-6"
                          style={{ 
                            backgroundColor: '#8d6e63', 
                            color: 'white'
                          }}
                        >
                          <FaMoneyBillWave className="me-1" />
                          ${displayRoom.price}
                        </span>
                      </div>
                      
                      {form.check_in && form.check_out && (
                        <div 
                          className="p-3 rounded-3"
                          style={{ 
                            backgroundColor: '#efebe9',
                            borderLeft: '4px solid #8d6e63'
                          }}
                        >
                          <h6 className="fw-semibold" style={{ color: '#5d4037' }}>Booking Summary</h6>
                          <div className="d-flex justify-content-between" style={{ color: '#6d4c41' }}>
                            <span>Nights:</span>
                            <span>{calculateNights()}</span>
                          </div>
                          <div className="d-flex justify-content-between" style={{ color: '#6d4c41' }}>
                            <span>Total:</span>
                            <span className="fw-bold">
                              ${(calculateNights() * parseFloat(displayRoom.price)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-7">
                    <h3 className="fw-bold mb-4" style={{ color: '#5d4037' }}>
                      Complete Your Booking
                    </h3>
                    
                    <form onSubmit={handleBooking} noValidate>
                      <div className="mb-3">
                        <label htmlFor="full_name" className="form-label fw-semibold" style={{ color: '#5d4037' }}>
                          Full Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}>
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            className={`form-control ${validationErrors.full_name ? 'is-invalid' : ''}`}
                            placeholder="John Doe"
                            required
                            style={{ 
                              borderColor: '#d7ccc8',
                              color: '#5d4037'
                            }}
                          />
                        </div>
                        {validationErrors.full_name && (
                          <div className="invalid-feedback d-block" style={{ color: '#d32f2f' }}>
                            {validationErrors.full_name}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#5d4037' }}>
                          Email
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}>
                            <FaEnvelope />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                            placeholder="your@email.com"
                            required
                            style={{ 
                              borderColor: '#d7ccc8',
                              color: '#5d4037'
                            }}
                          />
                        </div>
                        {validationErrors.email && (
                          <div className="invalid-feedback d-block" style={{ color: '#d32f2f' }}>
                            {validationErrors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label fw-semibold" style={{ color: '#5d4037' }}>
                          Phone Number
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}>
                            <FaPhone />
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                            placeholder="+1234567890"
                            required
                            style={{ 
                              borderColor: '#d7ccc8',
                              color: '#5d4037'
                            }}
                          />
                        </div>
                        {validationErrors.phone && (
                          <div className="invalid-feedback d-block" style={{ color: '#d32f2f' }}>
                            {validationErrors.phone}
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="check_in" className="form-label fw-semibold" style={{ color: '#5d4037' }}>
                            Check-in Date
                          </label>
                          <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}>
                              <FaCalendarAlt />
                            </span>
                            <input
                              type="date"
                              id="check_in"
                              name="check_in"
                              value={form.check_in}
                              onChange={handleChange}
                              className={`form-control ${validationErrors.check_in ? 'is-invalid' : ''}`}
                              min={new Date().toISOString().split('T')[0]}
                              max={maxDate}
                              required
                              style={{ 
                                borderColor: '#d7ccc8',
                                color: '#5d4037'
                              }}
                            />
                          </div>
                          {validationErrors.check_in && (
                            <div className="invalid-feedback d-block" style={{ color: '#d32f2f' }}>
                              {validationErrors.check_in}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="check_out" className="form-label fw-semibold" style={{ color: '#5d4037' }}>
                            Check-out Date
                          </label>
                          <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}>
                              <FaCalendarAlt />
                            </span>
                            <input
                              type="date"
                              id="check_out"
                              name="check_out"
                              value={form.check_out}
                              onChange={handleChange}
                              className={`form-control ${validationErrors.check_out ? 'is-invalid' : ''}`}
                              min={form.check_in || new Date().toISOString().split('T')[0]}
                              max={maxDate}
                              required
                              style={{ 
                                borderColor: '#d7ccc8',
                                color: '#5d4037'
                              }}
                            />
                          </div>
                          {validationErrors.check_out && (
                            <div className="invalid-feedback d-block" style={{ color: '#d32f2f' }}>
                              {validationErrors.check_out}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold mt-3"
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        style={{ 
                          backgroundColor: '#8d6e63', 
                          color: 'white',
                          border: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isLoading ? (
                          <>
                            <span 
                              className="spinner-border spinner-border-sm me-2" 
                              aria-hidden="true"
                            />
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: '#5d4037', color: 'white' }}
      />
    </div>
  );
};

export default BookRoom;