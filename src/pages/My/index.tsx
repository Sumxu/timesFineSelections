import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Info from "./Components/Info";
import Tools from "./Components/Tools";
const My: React.FC = () => {
  return (
      <div className="my-page">
        <Header></Header>
        <div className="tools-my-box">
          <Info></Info>
          <Tools></Tools>
        </div>
      </div>
  );
};
export default My;
