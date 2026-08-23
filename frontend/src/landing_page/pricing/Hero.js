import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-3 p-md-5 mt-3 mt-md-5 border-bottom text-center">
        <h1 className="fs-2">Charges</h1>
        <h3 className="text-muted fs-5">List of all charges and taxes</h3>
      </div>
      <div className="row p-3 p-md-5 mt-3 text-center">
        <div className="col-12 col-md-4 p-3 p-md-4 mb-4">
          <img src="media/images/pricingEquity.svg" className="img-fluid mb-3" style={{ maxHeight: "120px" }} alt="Free equity delivery" />
          <h2 className="fs-4 mb-3">Free equity delivery</h2>
          <p className="text-muted small">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className="col-12 col-md-4 p-3 p-md-4 mb-4">
          <img src="media/images/intradayTrades.svg" className="img-fluid mb-3" style={{ maxHeight: "120px" }} alt="Intraday and F&O trades" />
          <h2 className="fs-4 mb-3">Intraday and F&O trades</h2>
          <p className="text-muted small">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
        <div className="col-12 col-md-4 p-3 p-md-4 mb-4">
          <img src="media/images/pricingMF.svg" className="img-fluid mb-3" style={{ maxHeight: "120px" }} alt="Free direct MF" />
          <h2 className="fs-4 mb-3">Free direct MF</h2>
          <p className="text-muted small">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
