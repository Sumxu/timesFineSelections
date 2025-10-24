import "./index.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import logoIcon from "@/assets/home/logoIcon.png";
import listIcon from "@/assets/home/listIcon.png";
import { Drawer, Spin } from "antd";
import BuyNftPopup from "./component/BuyNftPopup";
import BackHeader from '@/components/BackHeader'
const Home: React.FC = () => {
  const [showBuyNftPopup, setShowBuyNftPopup] = useState(false);
  // 当前钱包地址
  const openPopupClick = () => {
    setShowBuyNftPopup(true);
  };
  const BuyNftPopupCloseChange = () => {
    setShowBuyNftPopup(false);
  };
  return (
    <>
      <div className="home-page">
        <BackHeader  title='NFT股东' rightIcon={listIcon} rightUrl='/outputList'/>
        <div className="header-box">
          <div className="center-number-option">
            <div className="number-option">
              <span className="spn-1">限量</span>
              <span className="spn-2">990枚</span>
            </div>
          </div>
          <div className="number-info-option">
            <div className="number-item">
              <div className="number-item-top">330</div>
              <div className="number-item-end">首期发售量(枚)</div>
            </div>
            <div className="line-item"></div>
            <div className="number-item">
              <div className="number-item-top">3000</div>
              <div className="number-item-end">发售价(USDT)</div>
            </div>
          </div>
          <div className="progressBar-option">
            <div className="progress-bar">
              <div className="progress-bar-check"></div>
            </div>
            <div className="progress-bar-number">
              <div className="number-item">已售：127</div>
              <div className="number-item">剩余：备份</div>
            </div>
          </div>
        </div>
        <div className="me-tools-box">
          <div className="me-header-option">
            <div className="item-txt">我的NFT</div>
            <div className="item-txt">0</div>
          </div>
          <div className="no-buy-box">
            <img className="logo-option" src={logoIcon} />
            <div className="hint-txt-1">您还没有购买NFT</div>
            <div className="hint-txt-2">成为NFT股东，享受更多权益</div>
          </div>

          <div className="buy-box">
            <div className="buy-info-option">
              <div className="buy-item-left">
                <div className="item-txt-1">+5.78</div>
                <div className="item-txt-2">昨日产出(TAX)</div>
              </div>

              <div className="buy-item-right">
                <div className="item-txt-1">1,538.02</div>
                <div className="item-txt-2">累计产出(TAX)</div>
              </div>
            </div>

            <div className="buy-option">
              <div className="buy-header-option">
                <img className="logo" src={logoIcon} />

                <div className="name">#00893288</div>
                <div className="tag">释放中…</div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-check"></div>
              </div>
              <div className="info-txt-option">
                <div className="info-txt-1">总产值</div>
                <div className="info-txt-1">已产出</div>
              </div>
              <div className="info-txt-option">
                <div className="info-txt-2">1000.00 TAX</div>
                <div className="info-txt-2">537.89 TAX</div>
              </div>
            </div>

            <div className="buy-option">
              <div className="buy-header-option">
                <img className="logo" src={logoIcon} />
                <div className="name">#00893288</div>
                <div className="tag-success">已释放完</div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-check"></div>
              </div>
              <div className="info-txt-option">
                <div className="info-txt-1">总产值</div>
                <div className="info-txt-1">已产出</div>
              </div>
              <div className="info-txt-option">
                <div className="info-txt-2">1000.00 TAX</div>
                <div className="info-txt-2">537.89 TAX</div>
              </div>
            </div>
          </div>
          <div className="btn-option" onClick={openPopupClick}>
            立即购买NFT
          </div>
        </div>
      </div>
      <Drawer
        rootClassName="buyNodeDrawer"
        maskClosable={true}
        destroyOnHidden={true}
        height={"auto"}
        closeIcon={false}
        open={showBuyNftPopup}
        title=""
        placement="bottom"
      >
        <BuyNftPopup onClose={() => BuyNftPopupCloseChange()} />
      </Drawer>
    </>
  );
};
export default Home;
