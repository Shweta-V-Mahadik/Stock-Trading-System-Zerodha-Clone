import React from "react";

function RightSection({
  productName,
  productDescription,
  learnMore,
  imageURL
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-3 p-md-5 order-2 order-md-1">
          <h1 className="mb-4 fs-2">{productName}</h1>
          <p className="text-muted">{productDescription}</p>

          <div>
            <a
              href={learnMore}
              style={{
                textDecoration: "none"
              }}
            >
              Learn More &nbsp;
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="col-12 col-md-6 p-3 text-center order-1 order-md-2">
          <img src={imageURL} alt={productName} className="img-fluid" style={{ maxHeight: "350px" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;