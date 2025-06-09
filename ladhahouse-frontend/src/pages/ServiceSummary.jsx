import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaTools, FaUser, FaPhone, FaEnvelope, FaCalendar, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

function ServiceSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const service = location.state?.service;

  useEffect(() => {
    if (!booking || !service) {
      navigate("/service-summary");
    }
  }, [booking, service, navigate]);

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

  return (
    <div className="container py-5 animate-fade-in" style={{ maxWidth: '800px' }}>
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
        <div className="text-center mb-4">
          <FaCheckCircle 
            className="mb-3" 
            size={50} 
            style={{ color: '#8d6e63' }} 
          />
          <h2 style={{ color: '#5d4037' }}>Service Booking Confirmed!</h2>
          <p style={{ color: '#6d4c41' }}>
            Your service request has been received. We'll contact you shortly to confirm details.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div 
              className="p-4 h-100 rounded"
              style={{ 
                backgroundColor: '#efebe9',
                borderLeft: '4px solid #8d6e63'
              }}
            >
              <h5 className="d-flex align-items-center mb-3" style={{ color: '#5d4037' }}>
                <FaTools className="me-2" style={{ color: '#8d6e63' }} /> 
                Service Details
              </h5>
              <div style={{ color: '#6d4c41' }}>
                <p className="mb-2">
                  <strong>Service:</strong> {service?.name || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Description:</strong> {service?.description || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Duration:</strong> 
                  <span 
                    className="badge ms-2"
                    style={{ 
                      backgroundColor: '#d7ccc8',
                      color: '#5d4037'
                    }}
                  >
                    {service?.duration_minutes || 0} mins
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Price:</strong> 
                  <span 
                    className="badge ms-2"
                    style={{ 
                      backgroundColor: '#8d6e63',
                      color: 'white'
                    }}
                  >
                    KES {parseFloat(service?.price || 0).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div 
              className="p-4 h-100 rounded"
              style={{ 
                backgroundColor: '#efebe9',
                borderLeft: '4px solid #8d6e63'
              }}
            >
              <h5 className="d-flex align-items-center mb-3" style={{ color: '#5d4037' }}>
                <FaUser className="me-2" style={{ color: '#8d6e63' }} /> 
                Your Details
              </h5>
              <div style={{ color: '#6d4c41' }}>
                <p className="mb-2 d-flex align-items-center">
                  <strong className="me-2">Name:</strong> 
                  {booking?.full_name || "N/A"}
                </p>
                <p className="mb-2 d-flex align-items-center">
                  <FaEnvelope className="me-2" style={{ minWidth: '20px' }} />
                  {booking?.email || "N/A"}
                </p>
                <p className="mb-2 d-flex align-items-center">
                  <FaPhone className="me-2" style={{ minWidth: '20px' }} />
                  {booking?.phone || "N/A"}
                </p>
                <p className="mb-0 d-flex align-items-center">
                  <FaCalendar className="me-2" style={{ minWidth: '20px' }} />
                  <span>
                    <strong>Scheduled: </strong>
                    {formatDate(booking?.scheduled_date)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top">
          <button 
            className="btn me-2"
            onClick={() => navigate("/services")}
            style={{
              backgroundColor: '#8d6e63',
              color: 'white',
              border: 'none'
            }}
          >
            Book Another Service
          </button>
          <button 
            className="btn"
            onClick={() => navigate("/")}
            style={{
              backgroundColor: 'transparent',
              color: '#5d4037',
              border: '1px solid #8d6e63'
            }}
          >
            Return Home
          </button>
        </div>
      </div>

      <style jsx="true">{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(93, 64, 55, 0.2);
        }
        .badge {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default ServiceSummary;
