import React from 'react'
import {Image} from 'react-bootstrap'
import logo from '../assets/logo.png'

const Logo = () => (
    <div>
        <Image src={logo} alt="" fluid />
    </div>
)

export default Logo;