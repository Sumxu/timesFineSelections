import "./index.scss";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
const AssetDetails: React.FC = () => {
  const tabArray = [
    {
      label: "TUSD",
      value: "1",
    },
    {
      label: "USD",
      value: "2",
    },
    {
      label: "TAX",
      value: "3",
    },
    {
      label: "积分",
      value: "4",
    },
  ];
  const [tabIndex, setTabIndex] = useState<string>("1");

  return (
    <>
      <div className="asset-details-page">
        <LeftBackHeader title="资产明细"></LeftBackHeader>
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
        <div className="asset-details-list-box">
          <div className="header-list-box">
            <div className="header-item">时间</div>
            <div className="header-item item-center">类型</div>
            <div className="header-item">数量</div>
          </div>
          <div className="list-box">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1].map((item, index) => {
              return (
                <div className="list-item-box" key={index}>
                  <div className="item-option date">2025-09-23 18:36:56</div>
                  <div className="item-option item-center">
                    <div>积分释放</div>
                    <div>200.00 TAX</div>
                  </div>
                  <div className="item-option">+32.56</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default AssetDetails;
