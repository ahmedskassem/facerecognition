import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className="mb3 mt3">
        <Tilt className="Tilt br2 shadow-2 center" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"><img className="pa2" alt="Logo" src={logo} width="100" height="auto" /></div>
        </Tilt>
        </div>
    );
}

export default Logo;