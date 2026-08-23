import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h3>The Zerodha Universe</h3>
        <p className="text-muted fs-5 mb-4">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="img-fluid" style={{ maxHeight: "40px" }} alt="smallcase" />
          <p className="text-small text-muted mt-3 fs-6">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/streakLogo.png" className="img-fluid" style={{ maxHeight: "40px" }} alt="Streak" />
          <p className="text-small text-muted mt-3 fs-6">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/goldenPiLogo.png" className="img-fluid" style={{ maxHeight: "40px" }} alt="GoldenPi" />
          <p className="text-small text-muted mt-3 fs-6">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/sensibullLogo.svg" className="img-fluid" style={{ maxHeight: "40px" }} alt="Sensibull" />
          <p className="text-small text-muted mt-3 fs-6">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/dittoLogo.png" className="img-fluid" style={{ maxHeight: "40px" }} alt="Ditto" />
          <p className="text-small text-muted mt-3 fs-6">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img src="media/images/zerodhaFundHouse.png" className="img-fluid" style={{ maxHeight: "40px" }} alt="Zerodha Fund House" />
          <p className="text-small text-muted mt-3 fs-6">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
      </div>

      <div className="row text-center mt-4">
        <button className="p-2 btn btn-primary fs-5 mb-5 btn-responsive">
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Universe;
