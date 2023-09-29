import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Function to display success notification
const showSuccessNotification = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
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

const EmpCreate = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(true);
    const [validation, setValidation] = useState(false);
    const [employeeNames, setEmployeeNames] = useState([]); // mengambil daftar nama employe

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8001/employee")
            .then((res) => res.json())
            .then((data) => {
                // Extract the names from the data
                const names = data.map((employee) => employee.name);
                setEmployeeNames(names);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setValidation(true);
            return;
        }

        // cek apakah nama sudah ada
        if (employeeNames.includes(name)) {
            showErrorNotification("Name already exists. Please choose a different name.");
            return;
        }

        const empdata = { name, email, phone, password, active };

        try {
            const response = await fetch("http://localhost:8001/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empdata),
            });

            if (response.ok) {
                showSuccessNotification();
                navigate("/");
            } else {
                showErrorNotification("Failed to save data");
                throw new Error("Failed to save data.");
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <label>Name</label>
                                            <input
                                                id='inputname'
                                                type="text"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    setValidation(true);
                                                }}
                                                className="form-control"
                                                required
                                            />
                                            {validation && !name && (
                                                <span className="text-danger">Enter the Name</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <label>Email</label>
                                            <input
                                                id='inputemail'
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <label>Phone</label>
                                            <input
                                                id='inputphone'
                                                type="number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <label>Password</label>
                                            <input
                                                id='inputpassword'
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="form-control"
                                                required
                                            />
                                            {validation && !password && (
                                                <span className="text-danger">Enter the password Number</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={(e) => setActive(e.target.checked)}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <button className="btn btn-success btn-sm me-2" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger btn-sm me-2">Back</Link>
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
}

export default EmpCreate;