import "./index.scss";
import moreIcon from "@/assets/home/moreIcon.png";
import goodsImg from "@/assets/home/goodsImg.png";
import usdtIcon from "@/assets/home/USDT.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { t } from "i18next";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import { userAddress } from "@/Store/Store.ts";
import NoData from "@/components/NoData";
import { useZoneConfig } from "@/config/classifyData";

const GoodsBox: React.FC = () => {
  const wallertAddress = userAddress().address;
  const [list, setList] = useState([]);
  const { zoneList, getZoneInfo } = useZoneConfig();
  // 列表是否加载
  const [listLoding, setListLoding] = useState<boolean>(false);
  // 是否还有更多数据可以加载
  const [isMore, setIsMore] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [dataParam, setDataParam] = useState({
    current: 1,
    isHome: true,
    size: 10,
  });
  // 获取更多列表数据
  const loadMoreAction = async () => {
    if (!isMore) {
      return;
    }
    const nexPage = current + 1;
    setCurrent(nexPage);
    setListLoding(true);
    await NetworkRequest({
      Url: "product/list",
      Method: "post",
      Data: {
        current: nexPage,
        size: dataParam.size,
        isHome: dataParam.isHome,
      },
    })
      .then((res) => {
        if (res.success) {
          setList((prevList) => [...prevList, ...res.data.data.records]);
          if (res.data.data.records.length == dataParam.size) {
            setIsMore(true);
          } else {
            setIsMore(false);
          }
        }
      })
      .finally(() => {
        setListLoding(false);
      });
  };

  const navigate = useNavigate();
  const goodsItemClick = (item) => {
    navigate(`/goodsDetail?id=${item.id}`);
  };
  const getDataList = async () => {
    setListLoding(true);
    const result = await NetworkRequest({
      Url: "product/list",
      Method: "post",
      Data: {
        current: 1,
        size: dataParam.size,
        isHome: dataParam.isHome,
      },
    });
    if (result.data.code == 200) {
      setList((prevList) => [...prevList, ...result.data.data.records]);
      if (result.data.data.records.length == dataParam.size) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
      console.log("isMore", isMore);
      setListLoding(false);
    } else {
      setListLoding(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);
  return (
    <div className="goods-box">
      <div className="goods-name-option">
        <div className="goods-left-title">{t("精选推荐")}</div>
        <div className="goods-right">
          <div className="right-txt">{t("更多商品")}</div>
          <img src={moreIcon} className="right-icon" />
        </div>
      </div>

      {list.length == 0 ? (
        <NoData />
      ) : (
        <div className="goods-item-box">
          {list.map((item, index) => {
            return (
              <div
                onClick={() => goodsItemClick(item)}
                className="goods-item"
                key={index}
              >
                <img className="goods-img" src={item.pic}></img>
                <div className="goods-txt">{item.name}</div>
                <div className="goods-bottom-option">
                  <img src={usdtIcon} className="usdt-icon"></img>
                  <div className="goods-price">{item.price}</div>
                </div>
                {getZoneInfo(item.classify).subsidy != 0 && (
                  <div className="goods-hint-txt">
                    {t("补贴")}
                    {getZoneInfo(item.classify).subsidy}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="loading-more-option" onClick={() => loadMoreAction()}>
        {isMore ? t("查看更多商品") : "没有更多商品了"}
        {listLoding && (
          <div className="loding flex flexCenter">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
export default GoodsBox;
