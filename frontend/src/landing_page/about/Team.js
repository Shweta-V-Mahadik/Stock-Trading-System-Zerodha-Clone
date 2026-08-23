import React from 'react'

function Team() {
    return ( 
      <div className="container">
        <div className="row p-3 p-md-5 border-top">
          <h1 className="text-center">
            People
          </h1>
        </div>

        <div className="row p-3 p-md-4 align-items-center">
          <div className="col-12 col-md-6 p-3 p-md-5 fs-6 text-muted text-center" style={{ lineHeight: "1.8" }}>
            <img src="media/images/nithinKamath.jpg" className="img-fluid rounded-circle mb-3" style={{ maxWidth: "200px" }} alt="Nithin Kamath" />
            <h4 className='mt-3'>Nithin Kamath</h4>
            <h6>Founder, CEO</h6>
          </div>
          <div className="col-12 col-md-6 p-3 p-md-5 fs-6 text-muted" style={{ lineHeight: "1.8", fontSize: "1.1em" }}>
            <p>
              Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
            </p>

            <p>
              He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>

            <p>
              Playing basketball is his zen.
            </p>

            <p>
              Connect on <a href="#!" style={{ textDecoration: "none" }}>Homepage</a> / <a href="#!" style={{ textDecoration: "none" }}>TradingQnA</a> / <a href="#!" style={{ textDecoration: "none" }}>Twitter</a>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Team;