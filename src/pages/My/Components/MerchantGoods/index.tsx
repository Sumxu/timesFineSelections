import "./index.scss";
import React, { useEffect, useState } from "react";
import { Input } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import usdtIcon from '@/assets/home/USDT.png' 
const MerchantGoods: React.FC = () => {
  const tabArray = [
    {
      label: "全部",
      value: "1",
    },
    {
      label: "安品区",
      value: "2",
    },
    {
      label: "优品区",
      value: "3",
    },
    {
      label: "臻品区",
      value: "4",
    },
  ];
  const [tabIndex, setTabIndex] = useState<string>("1");
  return (
    <div className="MerchantGoods">
      <div className="hintTxt">店铺商品</div>
      <div className="inputBox">
        <div className="searchIcon">
          <SearchOutline fontSize={14} color="rgba(255,255,255,0.35)" />
        </div>
        <Input
          placeholder="输入商品名称/编号搜索"
          className="inputClass"
          style={{
            "--color": "#fff",
            "--font-size": "14px",
            "--placeholder-color": "rgba(255,255,255,0.35)",
          }}
        ></Input>
      </div>
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
      <div className="goodsListBox">
        <div className="goodsItem">
          <div className="topOption">
            <div className="goodsImgLeft"></div>
            <div className="goodsRight">
              <div className="goodsName">徕芬LE30国庆限定礼盒款护发套徕芬LE30国庆限定礼盒款护发套</div>
              <div className="goodsTypeTxt">安品区｜#883902303</div>
              <div className="goodsPriceOption">
                <img src={usdtIcon} className="usdtIcon"></img>
                <span className="price">193.56</span>
              </div>
            </div>
          </div>
          <div className="endOption">
            <span className="spn">上架日期：2025-09-23 18:56:32</span>
            <span className="spn">销量：128</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MerchantGoods;
