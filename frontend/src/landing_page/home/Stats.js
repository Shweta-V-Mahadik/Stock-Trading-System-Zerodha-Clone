import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-3 align-items-center">
        <div className="col-12 col-md-6 p-3">
          <h2 className="fs-2 mb-4 mb-md-5">Trust with confidence</h2>
          
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with Rs.3.5+ lakh
            crores worth of equity investments.
          </p>
          <br />

          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification" or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <br />

          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs
          </p>
          <br />

          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-12 col-md-6 p-3 text-center">
          <img
            src="media/images/ecosystem.png"
            className="img-fluid mb-4"
            style={{ maxWidth: "90%" }}
            alt="Ecosystem"
          />
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#!" style={{ textDecoration: "none" }}>
              Explore our products <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#!" style={{ textDecoration: "none" }}>
              Try Kite demo <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
