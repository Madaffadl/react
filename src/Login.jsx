
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Login = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to display success notification
  const showSuccessNotification = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have successfully Logged In',
      showConfirmButton: false,
      timer: 1500
    });
  };

  // Function to display error notification
  const showErrorNotification = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    });
  };

  const showNetworkError = () => {
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8001/employee?name=${name}&password=${password}`
      );

      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          setIsLoggedIn(true);
          navigate("/");
          showSuccessNotification();
        } else {
          showErrorNotification('Invalid name or password number. Please try again.');
        }
      } else {
        showNetworkError();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={handleLogin} className="container">
          <div className="">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Name <span className="errmsg "></span></label>
                  <input
                    id='loginname'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control mt-2"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>password <span className="errmsg"></span></label>
                  <input
                    id='loginpassword'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mt-2"
                    required
                  />
                </div>
              </div>
              <div className="card-footer mt-3">
                <button type="submit" className="btn btn-primary w-100 fade-in ">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;




