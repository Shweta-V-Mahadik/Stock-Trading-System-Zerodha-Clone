import React from 'react'

function OpenAccount() {
    return ( 
         <div className='container p-3 p-md-5 mb-5'>
            <div className="row text-center">
                <img src='media/images/homeHero.png' alt="Open Account" className='img-fluid mb-4 mx-auto' style={{ maxWidth: '700px' }} />
                <h1 className='mt-3 mt-md-4 fs-2'>Open a Zerodha account</h1>
                <p className='mt-3 mb-4 text-muted'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className='p-2 btn btn-primary fs-5 mb-5 btn-responsive'>Sign up for free</button>
            </div>
        </div>
     );
}

export default OpenAccount;