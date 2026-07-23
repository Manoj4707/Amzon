import { useState } from "react";

function Login() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary me-2"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>

      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Login</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
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
                  Login
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;