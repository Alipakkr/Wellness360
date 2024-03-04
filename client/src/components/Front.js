import React from 'react';
import './Front.css';
import logo from './my-fitness-club.png' ;

const Front = () => {
    return (
        <div className='front'>
            <div className='company-logo'>
                <img src={logo} alt="no pic fount"/>
            </div>
            <div className='company-name'>
                My Fitness club
            </div>
        </div>
    );
};

export default Front;