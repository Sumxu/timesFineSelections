import "./index.scss";
import React, { useEffect, useState } from "react";
import { Popup, Stepper } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import usdt from "@/assets/home/USDT.png";
import { t } from "i18next";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import { userAddress } from "@/Store/Store.ts";
import { BigNumber, ethers } from "ethers";
import { fromWei } from "@/Hooks/Utils";
interface Props {
  visible: boolean;
  goodsData: object;
  specIndex: number;
  onClose: () => void;
  onSubmit: () => void;
}
const ConversionPopup: React.FC<Props> = ({
  visible,
  goodsData,
  specIndex = 0,
  onClose,
  onSubmit,
}) => {
  const [tabIndex, setTabIndex] = useState<string>("0");
  const [goodsNum, setGoodsNum] = useState<string>("1");
  const walletAddress = userAddress((state) => state.address);
  const [usdtBalance, setUsdtBalance] = useState<BigNumber>(BigNumber.from(0)); //usdt余额
  const specChange = (index) => {
    setTabIndex(index);
    specIndex = index;
  };
  //获取tax余额
  const getUsdtBalance = async () => {
    const result = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    if (result.value) {
      setUsdtBalance(result.value);
    }
  };
  useEffect(() => {
    if (visible == false) return;
    getUsdtBalance();
  }, [visible]);
  return (
    <>
      <Popup visible={visible}>
        <div className="buyGoods-popup-page">
          <div className="goodsOption">
            <img
              src={goodsData?.items?.[tabIndex]?.pic}
              className="leftImg"
            ></img>
            <div className="rightOption">
              <div className="goodsTxt">
                <div className="txt">{goodsData?.name}</div>
                <CloseOutline
                  fontSize={14}
                  color="rgba(255,255,255,0.35"
                  onClick={() => onClose()}
                ></CloseOutline>
              </div>
              <div className="priceOption">
                <img src={usdt} className="usdtIcon"></img>
                <div className="price">{goodsData?.price}</div>
              </div>
              <div className="spceName">
                {t("已选规格")}： {goodsData?.items?.[tabIndex]?.name}
              </div>
            </div>
          </div>
          <div className="specBox">
            <div className="specItem">
              <div className="specName">选择规格</div>
              <div className="specList">
                {goodsData?.items.map((specItem, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => specChange(index)}
                      className={`specTxt ${
                        tabIndex == index ? "specCheckClass" : ""
                      }`}
                    >
                      {specItem.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="buyNumberBox">
            <Stepper
              style={{
                "--border-radius": "8px",
                "--height": "36px",
                "--input-background-color": "rgba(255, 255, 255, 0.15)",
                "--input-width": "85px",
                "--button-text-color": "#fff",
                "--button-background-color": "rgba(255, 255, 255, 0.15)",
                "--input-font-color": "#fff",
              }}
              className="stepperClass"
              defaultValue={1}
              onChange={(value) => {
                setGoodsNum(value);
              }}
            />
          </div>
          <div className="tag-box">
            <div className="txt-option">{t("可获得补贴积分")}</div>
            <div className="txt-price-option">
              {goodsData?.items?.[tabIndex]?.integral}
            </div>
          </div>
          <div className="hint-txt-box">
            <div className="hint-txt-option">
              {t("需支付")}:{goodsData?.items?.[tabIndex]?.price * goodsNum}{" "}
              USDT
            </div>
            <div className="hint-txt-option right-option">
              {t("余额")}： {fromWei(usdtBalance)} USDT
            </div>
          </div>
          <div
            className="btn-submit"
            onClick={() => onSubmit(tabIndex, goodsNum)}
          >
            {t("确认")}
          </div>
        </div>
      </Popup>
    </>
  );
};
export default ConversionPopup;
