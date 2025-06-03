import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('https://ladha-house-1.onrender.com/api/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Rooms</h2>
      <div className="row">
        {rooms.map(room => (
          <div className="col-md-4" key={room.id}>
            <div className="card mb-4 shadow-sm">
              {room.image && <img src={room.image} className="card-img-top" alt={room.name} />}
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <p><strong>KES {room.price}</strong></p>
                <p>Status: <span className={room.is_available ? "text-success" : "text-danger"}>
                  {room.is_available ? "Available" : "Unavailable"}
                </span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRooms;
