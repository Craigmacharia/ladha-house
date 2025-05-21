import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';

const Contact = () => {
  return (
    <Container className="my-5 py-4" style={{ maxWidth: '1200px' }}>
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3" style={{ color: '#5d4037' }}>Get In Touch</h2>
        <p className="lead mx-auto" style={{ maxWidth: "700px", color: '#8d6e63' }}>
          We'd love to hear from you! Reach out for bookings, questions, or special requests.
        </p>
      </div>

      <Row className="g-4">
        {/* Contact Form Column */}
        <Col md={7}>
          <Card className="border-0 shadow-sm p-4 h-100" style={{ borderBottom: '4px solid #8d6e63' }}>
            <Card.Body>
              <h4 className="mb-4 fw-bold" style={{ color: '#5d4037' }}>Send us a message</h4>
              <Form>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label style={{ color: '#5d4037' }}>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        style={{ borderColor: '#d7ccc8', color: '#5d4037' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label style={{ color: '#5d4037' }}>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        style={{ borderColor: '#d7ccc8', color: '#5d4037' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formSubject">
                      <Form.Label style={{ color: '#5d4037' }}>Subject</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="What's this about?" 
                        style={{ borderColor: '#d7ccc8', color: '#5d4037' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formMessage">
                      <Form.Label style={{ color: '#5d4037' }}>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5} 
                        placeholder="Type your message here..." 
                        style={{ borderColor: '#d7ccc8', color: '#5d4037' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Button 
                      size="lg" 
                      className="px-4 py-2 fw-medium"
                      style={{ 
                        backgroundColor: '#8d6e63',
                        color: 'white',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Info Column */}
        <Col md={5}>
          <div className="d-flex flex-column h-100">
            {/* Contact Methods Card */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderBottom: '4px solid #8d6e63' }}>
              <Card.Body>
                <h4 className="mb-4 fw-bold" style={{ color: '#5d4037' }}>Contact Information</h4>
                
                <div className="d-flex mb-4">
                  <div className="me-3" style={{ color: '#8d6e63' }}>
                    <FaPhone size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#5d4037' }}>Phone</h6>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>+254 110 928 039</p>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>+254 711 987 654</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3" style={{ color: '#8d6e63' }}>
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#5d4037' }}>Email</h6>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>bookings@ladhahouse.com</p>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>support@ladhahouse.com</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="me-3" style={{ color: '#8d6e63' }}>
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#5d4037' }}>Address</h6>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>123 Hospitality Avenue</p>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="me-3" style={{ color: '#8d6e63' }}>
                    <FaClock size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#5d4037' }}>Opening Hours</h6>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>Front Desk: 24/7</p>
                    <p className="mb-0" style={{ color: '#6d4c41' }}>Reservations: 8AM - 8PM</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Support Card */}
            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#5d4037', color: 'white' }}>
              <Card.Body className="d-flex">
                <div className="me-3" style={{ color: '#8d6e63' }}>
                  <MdOutlineSupportAgent size={36} />
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Need immediate assistance?</h5>
                  <p className="mb-0">Our customer service team is available 24/7 to help with urgent requests.</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Map Section */}
      <div className="mt-5">
        <Card className="border-0 shadow-sm overflow-hidden">
          <Card.Body className="p-0">
            <iframe 
              title="LadhaHouse Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808559039515!2d36.82154831475395!3d-1.2928996359790518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d664f5a5a7%3A0x4e6e5e5e5e5e5e5e!2sNairobi%20City%20Centre!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </Card.Body>
        </Card>
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
      `}</style>
    </Container>
  );
};

export default Contact;