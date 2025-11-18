import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { t } from "i18next";

const ClassifyLeft: React.FC = ({ classifyId, classifyLeftChange }) => {
  const [tabCheckIndex, setTabCheckIndex] = useState<string>("");
  const leftList = [
    {
      label: t("全部"),
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
    },
  ];
  const itemClick = (item) => {
    setTabCheckIndex(item.value);
    classifyLeftChange(item.value);
  };
  useEffect(() => {
    setTabCheckIndex(classifyId);
  }, [classifyId]);
  return (
    <>
      <div className="classify-left-option">
        {leftList.map((item, index) => {
          const isCheck = tabCheckIndex == item.value ? true : false;
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
