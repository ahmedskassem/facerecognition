import React from 'react';
import './FaceRecognitionBox.css';

const FaceRecognitionBox = ({image, box}) => {
    console.log(box);
    if(image){
        return (
            <div className="flex justify-center">
            <div className="absolute mt2">
            <img alt="FaceRecognition" width="500px" height="auto" src={image} id="faceimg" />
            <div className="bounding-box" style={{top: box.top_row, left: box.left_col, right: box.right_col, bottom: box.bottom_row}}>
            </div>
            </div>
            </div>
        );
    } else { 
        return null;
    }
}

export default FaceRecognitionBox;