import React from 'react';
import style from '../styles/Photo.css';

const Photo = (props) => {
  return (
    <div>
      <img className="photo" src={props.photo} />
    </div>
  )
}

export default Photo;