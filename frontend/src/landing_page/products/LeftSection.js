import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 col-lg-5 p-3 p-md-4 text-center">
          <img src={imageURL} alt={productName} className="img-fluid" style={{ maxHeight: "350px" }} />
        </div>
        <div className="d-none d-lg-block col-lg-1"></div>
        <div className="col-12 col-md-6 col-lg-6 p-3 p-md-4">
          <h1 className="fs-2 mb-3">{productName}</h1>
          <p className="text-muted">{productDescription}</p>
          <div className="d-flex flex-wrap gap-4 mb-3">
            {tryDemo && (
              <a href={tryDemo} style={{ textDecoration: "none" }}>
                Try Demo <i className="fa-solid fa-arrow-right"></i>
              </a>
            )}
            {learnMore && (
              <a href={learnMore} style={{ textDecoration: "none" }}>
                Learn More <i className="fa-solid fa-arrow-right"></i>
              </a>
            )}
          </div>
          <div className="mt-3 d-flex flex-wrap gap-3">
            {googlePlay && (
              <a href={googlePlay}>
                <img src="media/images/googlePlayBadge.svg" alt="Google Play" />
              </a>
            )}
            {appStore && (
              <a href={appStore}>
                <img src="media/images/appStoreBadge.svg" alt="App Store" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
