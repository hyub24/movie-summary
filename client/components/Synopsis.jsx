import React from 'react';

const Synopsis = (props) => (
  <div className="synopsis-box">
    <h3 className="synopsis-header">{props.title} Synopsis</h3>
    <div className="synopsis">{props.synopsis}</div>
  </div>
)

export default Synopsis;