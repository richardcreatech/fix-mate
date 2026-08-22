import React from 'react'
import my_logo from "../assets/my_logo.png"

function Header() {
  return (
    <header>
          <img src={my_logo} width={50} alt="" />
          
          {/* <nav>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Metrics</a></li>
            </ul>
          </nav> */}

      <button id='hero_sign_btn' onClick={() => location.assign("https://fixmate-ashy.vercel.app")}>Sign In</button>
    </header>
  )
}

export default Header