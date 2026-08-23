import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-3 p-md-5 text-center">
          <img src="media/images/largestBroker.svg" alt="Largest Stock Broker" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 p-3 p-md-5 mt-2 mt-md-5">
          <h1 className="fs-2">Largest stock broker in India</h1>
          <p className="mb-4">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>

                <li>
                  <p>Commodity Derivatives</p>
                </li>

                <li>
                  <p>Currency Derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>

                <li>
                  <p>Direct Mutual Funds</p>
                </li>

                <li>
                  <p>Bonds and Gold</p>
                </li>
              </ul>
            </div>
          </div>
          <img src='media/images/pressLogos.png' className="img-fluid mt-3" style={{ maxWidth: "90%" }} alt="Press Logos" />
        </div>
      </div>
    </div>
  );
}

export default Awards;
