import React from "react";
import { PacmanLoader } from "react-spinners";
import './style.css'

const Loading = props => {
  return (
    <div className="loading">
      <PacmanLoader loading={true} size={30} color={"lightgreen"}/> 
    </div>
  );
};

export default Loading;