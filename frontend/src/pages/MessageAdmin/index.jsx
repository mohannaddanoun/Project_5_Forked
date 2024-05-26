import "./style.css";
import { useDispatch } from 'react-redux';
import { setLogout } from '../../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [show, setShow] = useState(false);

  const navigateHome = () => navigate('/adminPage');
  const navigateMessage = () => navigate('/message');
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get("http://localhost:5000/messages/");
        console.log(result.data);
        
        if (Array.isArray(result.data.result)) {
          setMessages(result.data.result);
        } else {
          console.error("Expected an array:", result.data.result);
        }
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };
    fetchMessages();
  }, []);
  
  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate('/');
  };

  const handleShow = (message) => {
    setSelectedMessage(message);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="bg-body-tertiary d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-info w-100">
        <div className="container">
          <span className="navbar-brand">Admin Dashboard</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link" onClick={navigateHome}>Home</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={navigateMessage}>Messages</span>
              </li>
              <li className="logout-style nav-item logout">
                <button className="btn btn-outline-light ml-2" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container flex-grow-1 mt-4 mb-5">
        <div className="row">
          <div className="col-12">
            <div className="messages-box" style={{ height: '400px', overflowY: 'scroll', overflowX: 'hidden' }}>
              <ul className="list-group">
                {messages.map((message, index) => (
                  <li className="list-group-item list-group-item-action" key={index} onClick={() => handleShow(message)} style={{ cursor: 'pointer' }}>
                    <h5 className="mb-1">{message.user_title}</h5>
                    <small className="text-muted">{message.user_name}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-secondary text-white text-center py-3 fixed-bottom w-100">
        &#169; Infinite Horizon
      </footer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <>
              <h5>{selectedMessage.user_title}</h5>
              <h6 className="text-muted">{selectedMessage.user_name}</h6>
              <p>{selectedMessage.user_message}</p>
              <a href={`mailto:${selectedMessage.user_email}`}>{selectedMessage.user_email}</a>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Index;
