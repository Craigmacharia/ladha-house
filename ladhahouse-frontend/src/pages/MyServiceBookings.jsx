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
        const res = await axios.get("http://localhost:8000/api/my-service-bookings/", {
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

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">My Service Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-info">You have no service bookings yet.</div>
      ) : (
        bookings.map(booking => (
          <div key={booking.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title"><FaTools className="me-2" /> {booking.service.name}</h5>
              <p className="card-text">{booking.service.description}</p>
              <ul className="list-unstyled mb-0">
                <li><FaCalendarAlt className="me-2 text-warning" /> {booking.scheduled_date}</li>
                <li><FaMoneyBillWave className="me-2 text-success" /> KES {booking.service.price}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyServiceBookings;
