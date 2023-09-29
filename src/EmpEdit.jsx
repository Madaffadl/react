import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    active: true,
  });

  useEffect(() => {
    fetch(`http://localhost:8001/employee/${empid}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [empid]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setEmployee({
      ...employee,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8001/employee/${empid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire('Saved!', '', 'success');
              navigate("/");
            } else {
              showErrorNotification();
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        navigate("/");
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-title mx-auto p-0">
                <h2 className="">Employee Edit</h2>
              </div>
              <div className="card-body pt-1">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-2">
                      <label>ID</label>
                      <input
                        name="id"
                        value={employee.id}
                        disabled
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-2">
                      <label>Name</label>
                      <input
                        id='editname'
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-2">
                      <label>Email</label>
                      <input
                        id='editemail'
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-2">
                      <label>Phone</label>
                      <input
                        id='editphone'
                        name="phone"
                        value={employee.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-2">
                      <label>Password</label>
                      <input
                        id='editpassword'
                        name="password"
                        type='password'
                        value={employee.password}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        name="active"
                        checked={employee.active}
                        onChange={handleInputChange}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label mb-2">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button id='save_edit' className="btn btn-success btn-sm me-2" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger btn-sm me-2">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
