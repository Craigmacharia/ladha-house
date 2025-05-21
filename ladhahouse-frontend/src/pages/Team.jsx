import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { FaHotel, FaHandshake, FaUsers, FaAward, FaPhone, FaEnvelope } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { GiTeamUpgrade } from "react-icons/gi";

const Team = () => {
  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: "Eliza Gathoni",
      role: "Founder & CEO",
      bio: "Hospitality expert with 15+ years in luxury accommodations globally.",
      image: "gathoni.jpg",
      email: "veronica@ladhahouse.com",
      phone: "+254 700 123 456"
    },
    {
      id: 2,
      name: "Josiah Nyangati",
      role: "Operations Manager",
      bio: "Ensures seamless guest experiences and staff coordination.",
      image: "https://tse4.mm.bing.net/th?id=OIG3..Cb3w8h1BctI3n2OOTUI&pid=ImgGn",
      email: "sarah@ladhahouse.com",
      phone: "+254 711 234 567"
    },
    {
      id: 3,
      name: "David Omondi",
      role: "Head Chef",
      bio: "Gourmet michellin level specialist crafting unforgettable dining experiences.",
      image: "https://tse4.mm.bing.net/th?id=OIG2.magqj385LqvcGRzq3GO5&cb=iwp1&pid=ImgGn",
      email: "david@ladhahouse.com",
      phone: "+254 722 345 678"
    },
    {
      id: 4,
      name: "Cate Kalovu",
      role: "Guest Relations",
      bio: "Makes every guest feel at home with personalized services and productivity.",
      image: "https://tse3.mm.bing.net/th?id=OIG4.lTqUDVHkxdRtRSUFJD2H&cb=iwp1&pid=ImgGn",
      email: "henry@ladhahouse.com",
      phone: "+254 733 456 789"
    },
  ];

  // Company Milestones
  const milestones = [
    { icon: <FaHotel size={24} />, title: "50+ Rooms", description: "Luxury accommodations" },
    { icon: <FaUsers size={24} />, title: "10,000+ Guests", description: "Served annually" },
    { icon: <FaAward size={24} />, title: "5 Awards", description: "Hospitality excellence" },
    { icon: <FaHandshake size={24} />, title: "15 Partners", description: "Trusted collaborations" },
  ];

  // Partners Data
  const partners = [
    { 
      name: "Flights 254", 
      logo: "https://bing.com/th/id/BCO.90e76a07-3495-4045-84b1-a990ab280dce.png" 
    },
    { 
      name: "Gojo's Cafe", 
      logo: "https://bing.com/th/id/BCO.d717568d-fffc-45cd-9486-9029f2f47e2a.png" 
    },
    { 
      name: "Ndovu Safaris", 
      logo: "https://bing.com/th/id/BCO.1b08ec6c-22ff-42bb-8df1-613ce59b4878.png" 
    },
    { 
        name: "Vee Health", 
        logo: "https://bing.com/th/id/BCO.c8d6cd06-6818-434c-b361-647a0c9bcb08.png" 
      },
    { 
      name: "Craig Devs", 
      logo: "https://bing.com/th/id/BCO.cd337a21-35d3-4d00-b315-754fd98c61b9.png" 
    },
  ];

  return (
    <Container className="my-5 py-4" style={{ maxWidth: '1200px' }}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3" style={{ color: '#5d4037' }}>Meet the LadhaHouse Family</h2>
        <p className="lead mx-auto" style={{ maxWidth: "700px", color: '#8d6e63' }}>
          Dedicated to exceptional hospitality, our team ensures your stay is unforgettable.
        </p>
      </div>

      {/* Our Team Section */}
      <section className="mb-5">
        <div className="d-flex align-items-center mb-4">
          <GiTeamUpgrade size={32} className="me-2" style={{ color: '#8d6e63' }} />
          <h3 className="fw-bold mb-0" style={{ color: '#5d4037' }}>Our Core Team</h3>
        </div>
        
        <Row className="g-4">
          {teamMembers.map((member) => (
            <Col key={member.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="border-0 shadow-sm h-100 hover-effect" style={{ borderBottom: '4px solid #8d6e63' }}>
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={member.image}
                    alt={member.name}
                    style={{ 
                      height: "250px", 
                      objectFit: "cover",
                      borderBottom: '1px solid #d7ccc8'
                    }}
                  />
                  <Badge className="position-absolute top-0 start-0 m-2" style={{ 
                    backgroundColor: '#8d6e63',
                    color: 'white'
                  }}>
                    {member.role}
                  </Badge>
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold mb-3" style={{ color: '#5d4037' }}>{member.name}</Card.Title>
                  <Card.Text className="mb-4" style={{ color: '#6d4c41' }}>{member.bio}</Card.Text>
                  <div className="d-flex justify-content-center gap-3">
                    <a href={`tel:${member.phone}`} style={{ color: '#8d6e63' }}>
                      <FaPhone size={18} />
                    </a>
                    <a href={`mailto:${member.email}`} style={{ color: '#8d6e63' }}>
                      <FaEnvelope size={18} />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Company Values & Milestones */}
      <section className="mb-5 py-4 rounded-3" style={{ backgroundColor: '#efebe9' }}>
        <Container>
          <div className="d-flex align-items-center mb-4">
            <IoIosPeople size={32} className="me-2" style={{ color: '#8d6e63' }} />
            <h3 className="fw-bold mb-0" style={{ color: '#5d4037' }}>Why Choose LadhaHouse?</h3>
          </div>
          
          <Row className="g-4 text-center">
            {milestones.map((item, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="p-3 h-100 d-flex flex-column align-items-center">
                  <div className="mb-3" style={{ color: '#8d6e63' }}>{item.icon}</div>
                  <h4 className="fw-bold" style={{ color: '#5d4037' }}>{item.title}</h4>
                  <p className="mb-0" style={{ color: '#6d4c41' }}>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Partners & Affiliates */}
      <section className="mb-5">
        <div className="text-center mb-5">
          <h3 className="fw-bold mb-3" style={{ color: '#5d4037' }}>Our Trusted Partners</h3>
          <p style={{ color: '#8d6e63' }}>Collaborating with the best to serve you better</p>
        </div>
        <Row className="g-4 justify-content-center">
          {partners.map((partner, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2}>
              <div className="d-flex flex-column align-items-center">
                <div className="partner-logo mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="img-fluid"
                    style={{ 
                      border: '2px solid #d7ccc8',
                      backgroundColor: 'white'
                    }}
                  />
                </div>
                <h6 className="text-center fw-medium" style={{ color: '#5d4037' }}>{partner.name}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Join Our Team CTA */}
      <section className="text-center py-5 rounded-3" style={{ backgroundColor: '#5d4037' }}>
        <h3 className="fw-bold mb-3 text-white">Want to Join Our Team?</h3>
        <p className="lead mb-4 text-white">We're always looking for passionate hospitality professionals.</p>
        <Button 
          variant="light" 
          size="lg" 
          className="px-4 fw-medium"
          style={{ 
            backgroundColor: '#8d6e63',
            color: 'white',
            border: 'none'
          }}
        >
          View Open Positions
        </Button>
      </section>

      <style jsx>{`
        .partner-logo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          padding: 0.5rem;
          object-fit: contain;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .partner-logo:hover {
          transform: scale(1.05);
        }
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        a:hover {
          opacity: 0.8;
        }
      `}</style>
    </Container>
  );
};

export default Team;