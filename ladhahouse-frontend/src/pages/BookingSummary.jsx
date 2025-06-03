import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaBed, 
  FaUser, 
  FaMoneyBillWave, 
  FaArrowLeft, 
  FaHome,
  FaSpinner
} from 'react-icons/fa';
import { format, differenceInDays } from 'date-fns';


function BookingSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const newBooking = location.state?.booking;
  const room = location.state?.room;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        let bookingsData = [];
    
        const API_URL = "https://ladha-house-1.onrender.com/api/my-bookings/";
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        bookingsData = response.data;
        setBookings(bookingsData); // if you use state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    

        bookingsData = response.data.results || [];

        if (newBooking && room) {
          const isNewBookingInList = bookingsData.some(b => 
            b.id === newBooking.id || 
            (b.check_in === newBooking.check_in && 
             b.check_out === newBooking.check_out && 
             b.email === newBooking.email)
          );

          if (!isNewBookingInList) {
            bookingsData = [{ ...newBooking, room }, ...bookingsData];
          }
        }

        setBookings(bookingsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (newBooking && room) {
          setBookings([{ ...newBooking, room }]);
        } else {
          setError("Failed to load booking information. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, navigate, newBooking, room]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const calculateNights = (checkIn, checkOut) => {
    return differenceInDays(new Date(checkOut), new Date(checkIn));
  };

  const calculateTotal = (booking) => {
    const nights = calculateNights(booking.check_in, booking.check_out);
    const total = nights * parseFloat(booking.room.price);
    return total.toFixed(2);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ color: '#5d4037' }}>
        <div className="spinner-border" style={{ color: '#8d6e63' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '1200px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button 
                className="btn me-2"
                onClick={() => navigate('/rooms')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#5d4037',
                  border: '1px solid #8d6e63',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaArrowLeft className="me-2" />
                Back to Rooms
              </button>
              <button 
                className="btn"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#5d4037',
                  border: '1px solid #8d6e63',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaHome className="me-2" />
                Home
              </button>
            </div>
            <h2 className="mb-0" style={{ color: '#5d4037' }}>
              {newBooking ? 'Booking Confirmation' : 'My Bookings'}
            </h2>
          </div>

          {error && (
            <div 
              className="alert mb-4"
              style={{ 
                backgroundColor: '#efebe9',
                borderLeft: '4px solid #d32f2f',
                color: '#5d4037'
              }}
            >
              {error}
              <button 
                className="btn btn-link p-0 ms-2"
                onClick={() => window.location.reload()}
                style={{ color: '#8d6e63' }}
              >
                Retry
              </button>
            </div>
          )}

          {bookings.map((booking, index) => {
            const nights = calculateNights(booking.check_in, booking.check_out);
            const totalPrice = calculateTotal(booking);
            
            return (
              <div 
                key={booking.id || index} 
                className="card mb-4 hover-effect"
                style={{ 
                  border: '1px solid #d7ccc8',
                  borderBottom: '4px solid #8d6e63'
                }}
              >
                <div 
                  className="card-header"
                  style={{ 
                    backgroundColor: '#5d4037',
                    color: 'white',
                    borderBottom: 'none'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FaBed className="me-3" size={24} style={{ color: '#8d6e63' }} />
                      <div>
                        <h3 className="h4 mb-0">{booking.room.name}</h3>
                        <small style={{ color: '#d7ccc8' }}>
                          {nights} night{nights !== 1 ? 's' : ''} • {formatDate(booking.check_in)} to {formatDate(booking.check_out)}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="h3 mb-0">${totalPrice}</div>
                      <small style={{ color: '#d7ccc8' }}>Total Price</small>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h5 className="mb-3" style={{ color: '#5d4037' }}>
                        <FaUser className="me-2" style={{ color: '#8d6e63' }} />
                        Guest Information
                      </h5>
                      <div className="ps-4">
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Name:</strong> {booking.full_name}
                        </p>
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Email:</strong> {booking.email}
                        </p>
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Phone:</strong> {booking.phone}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <h5 className="mb-3" style={{ color: '#5d4037' }}>
                        <FaCalendarAlt className="me-2" style={{ color: '#8d6e63' }} />
                        Stay Details
                      </h5>
                      <div className="ps-4">
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Check-in:</strong> {formatDate(booking.check_in)}
                        </p>
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Check-out:</strong> {formatDate(booking.check_out)}
                        </p>
                        <p className="mb-2" style={{ color: '#6d4c41' }}>
                          <strong>Nights:</strong> {nights}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded"
                    style={{ 
                      backgroundColor: '#efebe9',
                      borderLeft: '4px solid #8d6e63'
                    }}
                  >
                    <h5 className="mb-3" style={{ color: '#5d4037' }}>
                      <FaMoneyBillWave className="me-2" style={{ color: '#8d6e63' }} />
                      Price Breakdown
                    </h5>
                    <table className="table table-borderless">
                      <tbody>
                        <tr style={{ color: '#6d4c41' }}>
                          <td>Room Rate:</td>
                          <td className="text-end">${parseFloat(booking.room.price).toFixed(2)}/night</td>
                        </tr>
                        <tr style={{ color: '#6d4c41' }}>
                          <td>Number of Nights:</td>
                          <td className="text-end">{nights}</td>
                        </tr>
                        <tr className="border-top" style={{ color: '#5d4037' }}>
                          <td><strong>Total:</strong></td>
                          <td className="text-end"><strong>${totalPrice}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}

          {bookings.length === 0 && !error && (
            <div 
              className="alert text-center py-4"
              style={{ 
                backgroundColor: '#efebe9',
                borderLeft: '4px solid #8d6e63',
                color: '#5d4037'
              }}
            >
              <h4 className="mb-3">No bookings found</h4>
              <p className="mb-3">You haven't made any bookings yet.</p>
              <button 
                className="btn"
                onClick={() => navigate('/rooms')}
                style={{ 
                  backgroundColor: '#8d6e63',
                  color: 'white',
                  border: 'none'
                }}
              >
                Browse Available Rooms
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .btn:hover {
          background-color: #8d6e63 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default BookingSummary;