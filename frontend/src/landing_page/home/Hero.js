import React from 'react'

function Hero() {
    return ( 
        <div className='container p-3 p-md-5 mb-5'>
            <div className="row text-center">
                <img src='media/images/homeHero.png' alt="Hero" className='img-fluid mb-4 mb-md-5 mx-auto' style={{ maxWidth: '800px' }} />
                <h1 className='mt-3 mt-md-5 fs-2 fs-md-1'>Invest in everything</h1>
                <p className='fs-6 fs-md-5 text-muted'>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                <button className='p-2 btn btn-primary fs-5 mb-5 btn-responsive'>Sign up for free</button>
            </div>
            
        </div>
     );
}

export default Hero;