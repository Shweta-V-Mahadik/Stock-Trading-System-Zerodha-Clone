import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-3" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="#!">Track Tickets</a>
      </div>

      <div className="row p-3 m-0">
        <div className="col-12 col-md-6 p-3 p-md-4">
          <h1 className="fs-3 mb-4">Search for an answer or browse help topics to create a ticket</h1>
          <input
            type="text"
            placeholder="Eg. how do I activate F&O, why is my order getting rejected..."
            className="mb-4"
          />
          <div className="d-flex flex-wrap gap-2 mt-2">
            <a href="#!">Track account opening</a> 
            <a href="#!">Track segment activation</a>
            <a href="#!">Intraday margins</a>
            <a href="#!">Kite user manual</a>
          </div>
        </div>

        <div className="col-12 col-md-6 p-3 p-md-4">
          <h1 className="fs-3 mb-4">Featured</h1>
          <ol className="lh-lg">
            <li><a href="#!">Current Takeovers and Delisting - January 2024</a></li>
            <li><a href="#!">Latest Intraday leverages - MIS & CO</a></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
