import "./index.scss";
import moreIcon from "@/assets/home/moreIcon.png";
import goodsImg from "@/assets/home/goodsImg.png";
import usdtIcon from "@/assets/home/USDT.png";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
const GoodsBox: React.FC = () => {
  const navigate = useNavigate();
  const goodsItemClick = () => {
    navigate("/goodsDetail");
  };
  return (
    <div className="goods-box">
      <div className="goods-name-option">
        <div className="goods-left-title">{t('精选推荐')}</div>
        <div className="goods-right">
          <div className="right-txt">{t('更多商品')}</div>
          <img src={moreIcon} className="right-icon" />
        </div>
      </div>
      <div className="goods-item-box">
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div
              onClick={() => goodsItemClick()}
              className="goods-item"
              key={index}
            >
              <img className="goods-img" src={goodsImg}></img>
              <div className="goods-txt">徕芬LE30国庆限定礼盒款护发套装</div>
              <div className="goods-bottom-option">
                <img src={usdtIcon} className="usdt-icon"></img>
                <div className="goods-price">193.56</div>
              </div>
              <div className="goods-hint-txt">{t('补贴')}100%</div>
            </div>
          );
        })}
      </div>
      <div className="loading-more-option">{t('查看更多商品')}</div>
    </div>
  );
};
export default GoodsBox;
