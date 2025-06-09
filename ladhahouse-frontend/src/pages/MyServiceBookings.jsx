import { useEffect, useState } from "react";
import axios from "axios";
import { FaTools, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const MyServiceBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("https://ladha-house-1.onrender.com/api/my-service-bookings/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch service bookings", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchBookings();
  }, [token]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="spinner-grow text-brown" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3" style={{ color: '#5d4037' }}>Loading your service bookings...</h3>
      </div>
    </div>
  );

  return (
    <div className="container py-5" style={{ backgroundColor: '#f9f5f2', minHeight: '100vh' }}>
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold" style={{ 
          color: '#5d4037', 
          fontFamily: "'Playfair Display', serif",
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          My Service Bookings
        </h2>
        <div className="divider mx-auto" style={{ 
          width: '80px', 
          height: '3px', 
          backgroundColor: '#8d6e63',
          margin: '1rem auto'
        }}></div>
      </div>

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center" style={{ 
          backgroundColor: '#efebe9',
          borderColor: '#d7ccc8',
          color: '#5d4037',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          You have no service bookings yet.
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map(booking => (
            <div key={booking.id} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm" style={{ 
                backgroundColor: '#fff9f6',
                borderRadius: '8px',
                transition: 'transform 0.3s ease'
              }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#efebe9',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '15px'
                    }}>
                      <FaTools className="fs-4" style={{ color: '#8d6e63' }} />
                    </div>
                    <h5 className="card-title mb-0" style={{ 
                      color: '#5d4037',
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      {booking.service.name}
                    </h5>
                  </div>
                  <p className="card-text mb-4" style={{ color: '#6d4c41' }}>
                    {booking.service.description}
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-center">
                      <FaCalendarAlt className="me-3" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>{new Date(booking.scheduled_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <FaMoneyBillWave className="me-3" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>KES {booking.service.price.toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
                <div className="card-footer border-0" style={{ 
                  backgroundColor: '#efebe9',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px'
                }}>
                  <small className="text-muted" style={{ color: '#8d6e63' }}>
                    Booking ID: {booking.id}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default MyServiceBookings;
