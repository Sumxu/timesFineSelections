import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
const Order: React.FC = () => {
  const tabArray = [
    {
      label: "全部",
      value: "1",
    },
    {
      label: "已购买",
      value: "2",
    },
    {
      label: "已发货",
      value: "3",
    },
    {
      label: "已完成",
      value: "4",
    },
  ];

  const [tabIndex, setTabIndex] = useState<string>("1");
  return (
    <>
      <div className="order-page">
        <div className="order-content-box">
          <div className="tab-box">
            {tabArray.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTabIndex(item.value)}
                  className={`tab-item ${
                    tabIndex == item.value && "tab-active-item"
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
