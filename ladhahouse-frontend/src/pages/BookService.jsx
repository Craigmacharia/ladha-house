import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    scheduled_date: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = "Full name is required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.scheduled_date) errs.scheduled_date = "Please pick a date";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/service-bookings/",

        {
          ...form,
          service: serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service booked successfully!");
      setTimeout(() => {
        navigate("/service-summary", {
          state: { booking: response.data, service },
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-fade-in" style={{ maxWidth: '720px' }}>
      <button 
        onClick={() => navigate("/services")} 
        className="btn btn-sm mb-4"
        style={{
          backgroundColor: 'transparent',
          color: '#5d4037',
          border: '1px solid #8d6e63',
          transition: 'all 0.3s'
        }}
      >
        <FaArrowLeft className="me-2" />
        Back to Services
      </button>

      <div 
        className="card shadow p-4 border-0"
        style={{ 
          backgroundColor: '#f5f0eb',
          borderBottom: '4px solid #8d6e63',
          borderRadius: '10px'
        }}
      >
        <h3 className="mb-4 d-flex align-items-center" style={{ color: '#5d4037' }}>
          <FaClipboardList className="me-2" style={{ color: '#8d6e63' }} /> 
          Book Service: <span className="ms-2">{service?.name || "Service"}</span>
        </h3>

        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#5d4037' }}>
              <FaUser className="me-2" style={{ color: '#8d6e63' }} />
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
              style={{ 
                backgroundColor: '#efebe9',
                border: '1px solid #d7ccc8',
                color: '#5d4037'
              }}
              value={form.full_name}
              onChange={handleChange}
            />
            {errors.full_name && <div className="invalid-feedback" style={{ color: '#d32f2f' }}>{errors.full_name}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#5d4037' }}>
              <FaEnvelope className="me-2" style={{ color: '#8d6e63' }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              style={{ 
                backgroundColor: '#efebe9',
                border: '1px solid #d7ccc8',
                color: '#5d4037'
              }}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback" style={{ color: '#d32f2f' }}>{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#5d4037' }}>
              <FaPhone className="me-2" style={{ color: '#8d6e63' }} />
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              style={{ 
                backgroundColor: '#efebe9',
                border: '1px solid #d7ccc8',
                color: '#5d4037'
              }}
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback" style={{ color: '#d32f2f' }}>{errors.phone}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: '#5d4037' }}>
              <FaCalendarAlt className="me-2" style={{ color: '#8d6e63' }} />
              Preferred Date
            </label>
            <input
              type="date"
              name="scheduled_date"
              className={`form-control ${errors.scheduled_date ? 'is-invalid' : ''}`}
              style={{ 
                backgroundColor: '#efebe9',
                border: '1px solid #d7ccc8',
                color: '#5d4037'
              }}
              value={form.scheduled_date}
              onChange={handleChange}
            />
            {errors.scheduled_date && <div className="invalid-feedback" style={{ color: '#d32f2f' }}>{errors.scheduled_date}</div>}
          </div>

          <button 
            type="submit" 
            className="btn w-100 py-2"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#d7ccc8' : '#8d6e63',
              color: 'white',
              border: 'none',
              transition: 'all 0.3s'
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </div>

      <ToastContainer 
        position="top-center"
        toastStyle={{
          backgroundColor: '#efebe9',
          color: '#5d4037',
          borderLeft: '4px solid #8d6e63'
        }}
      />

      <style jsx="true">{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-control:focus {
          border-color: #8d6e63 !important;
          box-shadow: 0 0 0 0.25rem rgba(141, 110, 99, 0.25);
        }
        .btn:hover:not(:disabled) {
          background-color: #6d4c41 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(93, 64, 55, 0.2);
        }
      `}</style>
    </div>
  );
};

export default BookService;

