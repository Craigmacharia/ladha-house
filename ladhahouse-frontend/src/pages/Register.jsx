import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheck } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      const strength = Math.min(value.length / 8 * 100, 100);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "#d32f2f"; // red
    if (passwordStrength < 70) return "#ffa000"; // amber
    return "#388e3c"; // green
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register/", formData);
      navigate("/login", { state: { registrationSuccess: true } });
    } catch (err) {
      setError(
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div 
              className="card shadow-sm border-0 rounded-4 overflow-hidden hover-effect"
              style={{ 
                borderBottom: '4px solid #8d6e63',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-3" style={{ color: '#5d4037' }}>
                    Create Your Account
                  </h2>
                  <p style={{ color: '#8d6e63' }}>
                    Join the LadhaHouse community today
                  </p>
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
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{error}</span>
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setError("")}
                        style={{ fontSize: '0.75rem' }}
                      />
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label small mb-2" style={{ color: '#5d4037' }}>
                      Username
                    </label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{ 
                          backgroundColor: '#efebe9', 
                          borderColor: '#d7ccc8',
                          color: '#8d6e63'
                        }}
                      >
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="Enter your username"
                        required
                        style={{ 
                          borderColor: '#d7ccc8',
                          color: '#5d4037'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small mb-2" style={{ color: '#5d4037' }}>
                      Email address
                    </label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{ 
                          backgroundColor: '#efebe9', 
                          borderColor: '#d7ccc8',
                          color: '#8d6e63'
                        }}
                      >
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Enter your email"
                        required
                        style={{ 
                          borderColor: '#d7ccc8',
                          color: '#5d4037'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small mb-2" style={{ color: '#5d4037' }}>
                      Password
                    </label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{ 
                          backgroundColor: '#efebe9', 
                          borderColor: '#d7ccc8',
                          color: '#8d6e63'
                        }}
                      >
                        <FaLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="At least 8 characters"
                        minLength="8"
                        required
                        style={{ 
                          borderColor: '#d7ccc8',
                          color: '#5d4037'
                        }}
                      />
                      <button 
                        type="button" 
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ 
                          backgroundColor: '#efebe9', 
                          borderColor: '#d7ccc8',
                          color: '#8d6e63'
                        }}
                      >
                        {showPassword ? (
                          <span className="small">Hide</span>
                        ) : (
                          <span className="small">Show</span>
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-3">
                        <div 
                          className="progress mb-2"
                          style={{ 
                            height: "6px",
                            backgroundColor: '#d7ccc8'
                          }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ 
                              width: `${passwordStrength}%`,
                              backgroundColor: getPasswordStrengthColor()
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <small style={{ 
                            color: getPasswordStrengthColor(),
                            fontWeight: '500'
                          }}>
                            {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Moderate' : 'Strong'} password
                          </small>
                          {formData.password.length >= 8 && (
                            <small className="text-success">
                              <FaCheck className="me-1" />
                              Meets length
                            </small>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100 py-3 mt-3 fw-bold"
                    disabled={isLoading}
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
                      <>
                        <span className="me-2">Register</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid #d7ccc8' }}>
                  <p style={{ color: '#6d4c41' }}>
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#8d6e63' }}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .btn:hover {
          background-color: #6d4c41 !important;
          transform: translateY(-2px);
        }
        .form-control:focus {
          border-color: #8d6e63 !important;
          box-shadow: 0 0 0 0.25rem rgba(141, 110, 99, 0.25) !important;
        }
        .input-group-text {
          transition: all 0.3s ease;
        }
        .input-group-text:hover {
          background-color: #d7ccc8 !important;
        }
      `}</style>
    </div>
  );
}

export default Register;