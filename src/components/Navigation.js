import React from 'react';
import './Navigation.css';

const Navigation = ({isLoggedIn, ChangeUserState}) => {
    if(!isLoggedIn) {
        return (
            <div className="nav">
            <div className="ma1 pointer"><a onClick={() => ChangeUserState('signin')}>Sign In</a></div>
            <div className="ma1 pointer"><a onClick={() => ChangeUserState('register')}>Register</a></div>
            </div>
        );
    }else{
        return (
            <div className="nav">
            <div className="ma1 pointer"><a onClick={() => ChangeUserState('signout')}>Sign Out</a></div>
            </div>
        );        
    }
}

export default Navigation;