import React from "react";

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 mb-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          <a href="#!" style={{ textDecoration: "none" }}>
            See pricing <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div className="d-none d-md-block col-md-1"></div>
        
        <div className="col-12 col-md-6 mb-5">
          <div className="row text-center g-2">
            <div className="col-6 p-3 border">
              <h1 className="mb-3 fs-2">₹0</h1>
              <p className="small mb-0">Free equity delivery and direct mutual funds</p>
            </div>
            <div className="col-6 p-3 border">
              <h1 className="mb-3 fs-2">₹20</h1>
              <p className="small mb-0">Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
