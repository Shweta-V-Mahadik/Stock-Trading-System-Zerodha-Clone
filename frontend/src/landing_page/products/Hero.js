import React from 'react'

function Hero() {
    return ( 
        <div className="container border-bottom mb-5">
            <div className="row text-center mt-5 p-3">
                <p className='fs-1' style={{color:"rgb(74, 72, 72)", fontWeight:"500"}}>Zerodha Products</p>
                <h3 className='text-muted'>Sleek, modern, and intuitive trading platforms</h3>
                <p className='text-muted mt-3 mb-5'>Check out our <a href="" style={{textDecoration:"none"}}> investment offerings →</a></p>
            </div>
        </div>
     );
}

export default Hero;