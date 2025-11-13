import "./index.scss";
import React, { useEffect, useState } from "react";
const MerchantDataInfo: React.FC = () => {
  return (
    <div className="MerchantDataInfoPage">
      <div className="hintTxt">店铺销售数据</div>
      <div className="boxList">
        <div className="boxItem">
          <div className="price yellowColor">¥3,200.56</div>
          <div className="txt">今日销量</div>
        </div>
         <div className="boxItem">
          <div className="price">¥3,200.56</div>
          <div className="txt">本月销量</div>
        </div>
         <div className="boxItem">
          <div className="price">¥3,200.56</div>
          <div className="txt">本年销量</div>
        </div>
         <div className="boxItem">
          <div className="price">¥3,200.56</div>
          <div className="txt">累计销量</div>
        </div>
      </div>
    </div>
  );
};
export default MerchantDataInfo;
