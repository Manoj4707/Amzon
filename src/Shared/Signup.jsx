import amazonLogo from "../assets/logo-amzon.png";

function Signup() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">

          <div className="text-center">
            <img src={amazonLogo} className="logo-img" />
          </div>

          <div className="card">
            <div className="card-body">

              <h2>Create Account</h2>

              <div className="mt-3">
                <strong>Your name</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your full name"
                />
              </div>

              <div className="mt-3">
                <strong>Email</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>

              <div className="mt-3">
                <strong>Password</strong>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />

                <div>
                  <i className="bi bi-info-lg text-primary"></i>
                  <span className="fs-6">
                    Passwords must be at least 6 characters.
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  To verify your number, we will send you a text message with a
                  temporary code. Message and data rates may apply.
                </p>
              </div>

              <div className="mt-4">
                <button className="btn btn-warning w-100">Create your Amazon account</button>
              </div>

            </div>
          </div>

        </div>
      </div>
      <>
        <div className="text-center mt-3">
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center gap-4">
              <a href="#">Conditions of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Help</a>
            </div>

            <p className="mt-3 text-muted">
              © 1996-2024, Amazon.com, Inc. or its affiliates
            </p>
          </div>
          <p>
            Already have an account? <a href="/login">Sign-In</a>
          </p>
        </div>
      </>
    </div>
  );
}

export default Signup;