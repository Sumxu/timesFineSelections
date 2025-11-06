import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jifen from "@/assets/my/jifen.png";
import tusd from "@/assets/my/tusd.png";
import WithdrawPopup from '@/components/Popup/WithdrawPopup' 
import ConversionPopup from '@/components/Popup/ConversionPopup' 
import RedemptionPopup from '@/components/Popup/RedemptionPopup' 
const Info: React.FC = () => {
  const navigate=useNavigate()
  
  return (
    <>
      <div className="my-info-box">
        <div className="info-number-option">
          <div className="info-number-item">
            <div className="number-option">2,805.78</div>
            <div className="txt-option">TUSD余额</div>
          </div>
          <div className="info-number-line"></div>
          <div className="info-number-item">
            <div className="number-option">2,805.78</div>
            <div className="txt-option">USD余额</div>
          </div>
        </div>
        <div className="btn-box">
          <div className="btn-option btn-withdraw">提现</div>
          <div className="btn-option  btn-conversion">兑换</div>
        </div>
        <div className="info-tax-balance-box">
          <div className="info-tax-balance-option">
            <div className="left-option">
              <img className="icon" src={jifen} />
              <div className="left-info-item">
                <div className="number-option">1,035.00</div>
                <div className="txt-option">待释放积分</div>
              </div>
            </div>
            <div className="right-option">互转</div>
          </div>
          <div className="info-tax-line"></div>
          <div className="info-tax-balance-option">
            <div className="left-option">
              <img className="icon" src={tusd} />
              <div className="left-info-item">
                <div className="number-option">1,035.00</div>
                <div className="txt-option">TAX余额</div>
              </div>
            </div>
            <div className="right-option" onClick={()=>navigate('/assetDetails')}>资产明细</div>
          </div>
        </div>
      </div>
      {/* <RedemptionPopup></RedemptionPopup> */}
    </>
  );
};
export default Info;
