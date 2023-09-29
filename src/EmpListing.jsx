
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmpDetail from "./EmpDetail";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';


const confirmNotification = () => {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

const EmpListing = () => {
    const [empdata, setEmpData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate(`/employee/edit/${id}`);
    };

    const handleLogout = () => {
        confirmNotification().then((confirmed) => {
            if (confirmed) {
                navigate("/logout");

                Swal.fire(
                    'Logged Out!',
                    'You have successfully logged out',
                    'success'
                );
            }
        });
    };



    const removeEmployee = (id) => {
        confirmNotification().then((confirmed) => {
            if (confirmed) {
                fetch(`http://localhost:8001/employee/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => {
                        if (res.ok) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                            });
                            return res.json();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Delete Failed',
                                text: 'Failed to remove employee.',
                            });
                            throw new Error("Failed to remove employee.");
                        }
                    })
                    .then(() => {
                        fetchEmployeeData();
                    })
                    .catch((err) => {
                        console.error("Error during deletion:", err);
                    });
            }
        });
    };


    const loadDetail = (emp) => {
        setSelectedEmp(emp);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fetchEmployeeData = () => {
        fetch("http://localhost:8001/employee")
            .then((res) => res.json())
            .then((data) => {
                setEmpData(data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    return (
        <div className="container">
            <div className="card pt-2">
                <div className="card-title m-0">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="btn_add">
                        <EmpDetail
                            empdata={selectedEmp}
                            show={showModal}
                            handleClose={handleCloseModal}
                        />
                        <Link to="/employee/create" className="btn btn-success btn-sm me-2 mb-2" style={{ "float": "left" }}>
                            Add New (+)
                        </Link>
                    </div>
                    <div className="btn_logout">
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger btn-sm me-2 mb-2"
                            style={{ "float": "right" }}
                        >
                            Logout
                        </button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.active ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <button
                                            id="btnedit"
                                            onClick={() => loadEdit(item.id)}
                                            className="btn btn-success btn-sm me-2 btn-one"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            id="btnremove"
                                            onClick={() => removeEmployee(item.id)}
                                            className="btn btn-danger btn-sm me-2 btn-two "
                                        >
                                            Remove
                                        </button>
                                        <button
                                            id="btndetail"
                                            onClick={() => loadDetail(item)}
                                            className="btn btn-primary btn-sm me-2 btn-three"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default EmpListing;
