import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "@/pages/Home/Component/Header";
import ClassifyLeft from "./Component/classifyLeft";
import ClassifyContent from "./Component/classifyContent";
const Classify: React.FC = () => {
  return (
    <>
      <div className="classify-page-box">
        <div className="header-box">
          <Header isIconShow={false}></Header>
        </div>
        <div className="classify-list-box">
          <div className="classify-left-option">
            <ClassifyLeft />
          </div>
          <div className="classify-content-option">
            <ClassifyContent />
          </div>
        </div>
      </div>
    </>
  );
};
export default Classify;
