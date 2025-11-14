import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import SwiperGoods from "./Component/SwiperGoods";
import usdt from "@/assets/home/USDT.png";
import goodsCheck from "@/assets/img/goodsCheck.png";
import lineLeft from "@/assets/img/lineLeft.png";
import lineRight from "@/assets/img/lineRight.png";
import { RightOutline } from "antd-mobile-icons";
import GoodsBuyPopup from "@/components/Popup/GoodsBuyPopup";
import { t } from "i18next";
const GoodsDetail: React.FC = () => {
  const navigate = useNavigate();
  const buyClick = () => {
    return;
    navigate("/creatOrder");
  };
  const content = `
    <h2>文章标题</h2>
    <p>这是一段<strong>富文本内容</strong>，支持 HTML 标签。</p>
    <img src="https://via.placeholder.com/200" alt="示例图片" />
    <p>可以用来展示从后端返回的富文本字段。</p>
  `;
  return (
    <div className="goodsDetailPage">
      <div className="leftBackBox">
        <LeftBackHeader title={t("商品详情")}></LeftBackHeader>
      </div>
      <div className="goodsDetailContent">
        <SwiperGoods></SwiperGoods>
        <div className="goodsInfoBox">
          <div className="goodsPrice">
            <img src={usdt} className="icon"></img>
            <div className="price">193.56</div>
          </div>
          <div className="txt">徕芬LE30国庆限定礼盒款护发套装</div>
          <div className="hintOption">
            <div className="item item1bg">
              <div className="txt1 item1Color">100%</div>
              <div className="txt2 item1Color">{t('补贴倍数')}</div>
            </div>
            <div className="item item2bg">
              <div className="txt1 item2TopColor">0.1%</div>
              <div className="txt2 item2EndColor">{t('每日释放')}</div>
            </div>
          </div>
        </div>

        <div className="goodsOptions">
          <div className="goodsInfoItem">
            <div className="label">{t('规格')}</div>
            <div className="value">LE30橙色 礼盒款</div>
            <div className="icon">
              <RightOutline color="#727272" fontSize={12} />
            </div>
          </div>
          <div className="goodsInfoLine"></div>
          <div className="goodsInfoItem">
            <div className="label">{t('补贴')}</div>
            <div className="value">193.56 {t('积分')}</div>
            <div className="icon">
              <RightOutline color="#727272" fontSize={12} />
            </div>
          </div>
          <div className="goodsInfoLine"></div>
          <div className="goodsInfoItem">
            <div className="label">{t('服务')}</div>
            <div className="value">
              <div className="tagOption">
                <img src={goodsCheck} className="icon"></img>
                <div className="name">{t('品质保障')}</div>
              </div>
              <div className="tagOption">
                <img src={goodsCheck} className="icon"></img>
                <div className="name">{t('包邮')}</div>
              </div>
              <div className="tagOption">
                <img src={goodsCheck} className="icon"></img>
                <div className="name">{t('七天无理由')}</div>
              </div>
            </div>
            <div className="icon">
              <RightOutline color="#727272" fontSize={12} />
            </div>
          </div>
          <div className="goodsInfoLine"></div>
          <div className="goodsInfoItem">
            <div className="label">
              <div className="leftIcon"></div>
            </div>
            <div className="value">徕芬时空优品旗舰店</div>
            <div className="rightTxt">#10008095</div>
          </div>
        </div>

        <div className="goodsDetailContent">
          <div className="goodsTopBox">
            <img src={lineLeft} className="leftLine"></img>
            <div className="centerTxt">{t('商品描述')}</div>
            <img src={lineRight} className="leftLine"></img>
          </div>

          <div
            className="richTextContent"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <div className="endFixedBox">
        <div className="leftOption">
          <div className="spn1"></div>
          <div className="spn2">{t('客服')}</div>
        </div>
        <div className="rightOption">
          <div className="btn" onClick={() => buyClick()}>
            {t('立即购买')}
          </div>
        </div>
      </div>
      <GoodsBuyPopup></GoodsBuyPopup>
    </div>
  );
};
export default GoodsDetail;
