import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
const ClassifyLeft: React.FC = () => {
  const [tabCheckIndex, setTabCheckIndex] = useState<string>("");
  const leftList = [
    {
      label: "全部",
      value: "0",
    },
    {
      label: "安品区",
      value: "1",
    },
    {
      label: "优品区",
      value: "2",
    },
    {
      label: "臻品区",
      value: "3",
    },
    {
      label: "兑换区",
      value: "4",
    }
  ];
  const itemClick = (item) => {
    setTabCheckIndex(item.value);
  };
  return (
    <>
      <div className="classify-option">
        {leftList.map((item, index) => {
          const isCheck = tabCheckIndex == index ? true : false;
          return (
            <div
              className={`item ${isCheck && "item-check"}`}
              onClick={() => itemClick(item)}
              key={index}
            >
              {isCheck && <div className="item-check-line"></div>}
              {item.label}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ClassifyLeft;
