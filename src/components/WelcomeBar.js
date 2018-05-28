import React from 'react';

const WelcomeBar = (props) => {
        return (
            <div className="tc ma3">
            Hello {props.userName}, You have used our app to detect {props.entries} faces.
            </div>
        );
}

export default WelcomeBar;