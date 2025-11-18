import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jifen from "@/assets/my/jifen.png";
import tusd from "@/assets/my/tusd.png";
import { t } from "i18next";
import WithdrawPopup from "@/components/Popup/WithdrawPopup";
import ConversionPopup from "@/components/Popup/ConversionPopup";
const Info: React.FC = () => {
  const navigate = useNavigate();
  const [withDrawShow, setWithDrawShow] = useState<boolean>(false); //提现

  const [conversionShow, setConversionShow] = useState<boolean>(false); //互转

  const withDrawShowClick = () => {
    setWithDrawShow(true);
  };

  const conversionShowClick = () => {
    setConversionShow(true);
  };
  return (
    <>
      <div className="my-info-box">
        <div className="info-number-option">
          <div className="info-number-item">
            <div className="number-option">2,805.78</div>
            <div className="txt-option">TUSD{t("余额")}</div>
          </div>
          <div className="info-number-line"></div>
          <div className="info-number-item">
            <div className="number-option">2,805.78</div>
            <div className="txt-option">USD{t("余额")}</div>
          </div>
        </div>
        <div className="btn-box">
          <div
            className="btn-option btn-withdraw"
            onClick={() => withDrawShowClick()}
          >
            {t("提现")}
          </div>
          <div className="btn-option  btn-conversion"
          onClick={()=>conversionShowClick()}
          >{t("兑换")}</div>
        </div>
        <div className="info-tax-balance-box">
          <div className="info-tax-balance-option">
            <div className="left-option">
              <img className="icon" src={jifen} />
              <div className="left-info-item">
                <div className="number-option">1,035.00</div>
                <div className="txt-option">{t("待释放积分")}</div>
              </div>
            </div>
            <div className="right-option">{t("互转")}</div>
          </div>
          <div className="info-tax-line"></div>
          <div className="info-tax-balance-option">
            <div className="left-option">
              <img className="icon" src={tusd} />
              <div className="left-info-item">
                <div className="number-option">1,035.00</div>
                <div className="txt-option">TAX{t("余额")}</div>
              </div>
            </div>
            <div
              className="right-option"
              onClick={() => navigate("/assetDetails")}
            >
              {t("资产明细")}
            </div>
          </div>
        </div>
      </div>
      <ConversionPopup
        isShow={conversionShow}
        onClose={() => setConversionShow(false)}
      ></ConversionPopup>
      <WithdrawPopup
        isShow={withDrawShow}
        onClose={() => setWithDrawShow(false)}
      ></WithdrawPopup>
    </>
  );
};
export default Info;
