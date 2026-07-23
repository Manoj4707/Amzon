import { useState } from "react";

function CreateAccount() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-success"
        onClick={() => setShowModal(true)}
      >
        Create Account
      </button>

      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Create Account
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="mb-3">
                  <label>Name</label>

                  <input
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    className="form-control"
                    type="email"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    className="form-control"
                    type="password"
                  />
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>

                  <input
                    className="form-control"
                    type="password"
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

                <button className="btn btn-primary">
                  Create Account
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateAccount;