import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login/", credentials);
      const token = res.data.access;

      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.detail ||
        "Invalid credentials. Please try again."
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
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden" style={{ borderBottom: '4px solid #8d6e63' }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: '#5d4037' }}>
                    <FaSignInAlt className="me-2" style={{ color: '#8d6e63' }} />
                    Welcome Back
                  </h2>
                  <p style={{ color: '#8d6e63' }}>Sign in to your account</p>
                  {location.state?.registrationSuccess && (
                    <div 
                      className="alert mt-3" 
                      style={{ 
                        backgroundColor: '#efebe9',
                        borderLeft: '4px solid #8d6e63',
                        color: '#5d4037'
                      }}
                    >
                      Registration successful! Please log in.
                    </div>
                  )}
                </div>

                {error && (
                  <div 
                    className="alert alert-dismissible fade show"
                    style={{ 
                      backgroundColor: '#efebe9',
                      borderLeft: '4px solid #d32f2f',
                      color: '#5d4037'
                    }}
                  >
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError("")}
                    />
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small" style={{ color: '#5d4037' }}>Username</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ 
                        backgroundColor: '#efebe9', 
                        borderColor: '#d7ccc8',
                        color: '#8d6e63'
                      }}>
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        value={credentials.username}
                        placeholder="Enter your username"
                        required
                        autoFocus
                        style={{ 
                          borderColor: '#d7ccc8',
                          color: '#5d4037'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small" style={{ color: '#5d4037' }}>Password</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ 
                        backgroundColor: '#efebe9', 
                        borderColor: '#d7ccc8',
                        color: '#8d6e63'
                      }}>
                        <FaLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        placeholder="Enter your password"
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
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        style={{ 
                          borderColor: '#8d6e63',
                          backgroundColor: '#efebe9'
                        }}
                      />
                      <label className="form-check-label small" htmlFor="rememberMe" style={{ color: '#6d4c41' }}>
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="small text-decoration-none" style={{ color: '#8d6e63' }}>
                      Forgot password?
                    </Link>
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100 py-2 mt-2 fw-bold"
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#8d6e63',
                      color: 'white',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    ) : (
                      <span className="me-2">Sign In</span>
                    )}
                    <FaArrowRight />
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p style={{ color: '#6d4c41' }}>
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: '#8d6e63' }}>
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn:hover {
          background-color: #6d4c41 !important;
          transform: translateY(-2px);
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .form-control:focus {
          border-color: #8d6e63;
          box-shadow: 0 0 0 0.25rem rgba(141, 110, 99, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Login;
