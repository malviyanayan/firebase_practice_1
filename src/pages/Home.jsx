import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Welcome to FirebaseApp</h1>
            <p className="lead mb-4">
              Your ultimate productivity companion powered by Firebase. Manage your todos, track your progress, and stay organized.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/auth" className="btn btn-light btn-lg">Get Started</a>
              <a href="#features" className="btn btn-outline-light btn-lg">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-check-circle-fill text-primary fs-1 mb-3"></i>
                  <h5 className="card-title">Todo Management</h5>
                  <p className="card-text">
                    Create, edit, and organize your tasks with our intuitive todo system. Never forget important deadlines again.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-shield-check text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Secure Authentication</h5>
                  <p className="card-text">
                    Sign in securely with email/password or social accounts. Your data is protected with Firebase security.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-cloud text-info fs-1 mb-3"></i>
                  <h5 className="card-title">Cloud Sync</h5>
                  <p className="card-text">
                    Access your todos from anywhere. All data is synchronized across devices in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">About FirebaseApp</h2>
              <p className="mb-4">
                FirebaseApp is built with modern web technologies to provide you with the best task management experience.
                Using React for the frontend and Firebase for backend services, we ensure your data is secure and accessible.
              </p>
              <p className="mb-4">
                Whether you're a student, professional, or just someone who loves staying organized, FirebaseApp helps you
                manage your daily tasks efficiently. Join thousands of users who have improved their productivity with our app.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check text-success me-2"></i>Free to use</li>
                <li className="mb-2"><i className="bi bi-check text-success me-2"></i>No ads</li>
                <li className="mb-2"><i className="bi bi-check text-success me-2"></i>Cross-platform</li>
                <li className="mb-2"><i className="bi bi-check text-success me-2"></i>Real-time sync</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <img
                src="https://via.placeholder.com/600x400/667eea/ffffff?text=Productivity"
                alt="Productivity"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                  <p className="card-text">
                    "FirebaseApp has completely changed how I manage my tasks. It's intuitive and reliable!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      J
                    </div>
                    <div>
                      <strong>John Doe</strong>
                      <br />
                      <small className="text-muted">Product Manager</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                  <p className="card-text">
                    "The best todo app I've used. Syncs perfectly across all my devices."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      S
                    </div>
                    <div>
                      <strong>Sarah Wilson</strong>
                      <br />
                      <small className="text-muted">Designer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                  <p className="card-text">
                    "Simple yet powerful. FirebaseApp keeps me organized and productive every day."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      M
                    </div>
                    <div>
                      <strong>Mike Johnson</strong>
                      <br />
                      <small className="text-muted">Developer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join thousands of users who are already using FirebaseApp to boost their productivity.
          </p>
          <a href="/auth" className="btn btn-light btn-lg">Sign Up Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 FirebaseApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
