import { useEffect, useState } from "react";
import axios from "axios";
import { FaTools, FaCalendarAlt, FaMoneyBillWave, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const API_BASE_URL = "https://ladha-house-1.onrender.com";

const MyServiceBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/services/my-service-bookings/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(res.data.results || res.data || []);
      } catch (err) {
        console.error("Failed to fetch service bookings", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchBookings();
  }, [token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not scheduled";
    return new Intl.DateTimeFormat('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateStr));
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div 
          className="spinner-grow" 
          style={{ width: '3rem', height: '3rem', color: '#8d6e63' }} 
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5" style={{ color: '#5d4037' }}>
          Loading your service bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#f9f5f2', minHeight: '100vh' }}>
      <h1 className="text-center mb-5" style={{
        color: '#5d4037',
        fontWeight: '600',
        fontFamily: "'Playfair Display', serif"
      }}>
        My Service Bookings
      </h1>

      {bookings.length === 0 ? (
        <div 
          className="alert alert-info text-center" 
          style={{ backgroundColor: '#efebe9', borderColor: '#d7ccc8', color: '#5d4037' }}
        >
          You have no service bookings yet.
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 shadow-sm border-0" 
                style={{ borderBottom: '4px solid #8d6e63' }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#efebe9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}
                    >
                      <FaTools className="fs-4" style={{ color: '#8d6e63' }} />
                    </div>
                    <h5 
                      className="mb-0" 
                      style={{ color: '#5d4037', fontFamily: "'Playfair Display', serif" }}
                    >
                      {booking.service?.name}
                    </h5>
                  </div>

                  <p style={{ color: '#6d4c41' }}>
                    {booking.service?.description}
                  </p>

                  <ul className="list-unstyled mt-3 mb-0">
                    <li className="mb-2 d-flex align-items-center">
                      <FaCalendarAlt className="me-2" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>
                        {formatDate(booking.scheduled_date)}
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FaMoneyBillWave className="me-2" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>
                        KES {parseFloat(booking.service?.price || 0).toLocaleString()}
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FaUser className="me-2" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>
                        {booking.full_name || "N/A"}
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FaEnvelope className="me-2" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>
                        {booking.email || "N/A"}
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FaPhone className="me-2" style={{ color: '#8d6e63' }} />
                      <span style={{ color: '#5d4037' }}>
                        {booking.phone || "N/A"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div 
                  className="card-footer border-0 text-center"
                  style={{ backgroundColor: '#efebe9', color: '#8d6e63' }}
                >
                  Booking ID: {booking.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default MyServiceBookings;

