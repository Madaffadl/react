import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EmpDetail = ({ empdata, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {empdata && (
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>{empdata.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>ID:</strong>
                </td>
                <td>{empdata.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{empdata.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{empdata.phone}</td>
              </tr>
              <tr>
                <td>
                  <strong>Password:</strong>
                </td>
                <td>{empdata.password}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="btn btn-sm">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmpDetail;
