import "./index.scss";
import React, { useEffect, useState } from "react";
import { Input } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import usdtIcon from "@/assets/home/USDT.png";
import { t } from "i18next";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import NoData from "@/components/NoData";
import { useNavigate } from "react-router-dom";
import { InfiniteScroll } from "antd-mobile";
import MerchantGoodsOrder from "@/pages/My/Components/MerchantGoodsOrder";
interface listItem {
  id: number;
  name: string;
  pic: string;
  classify: string;
  price: string;
  sellCount: string;
  publishTime: string;
}
const MerchantGoods: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<string>("0");
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<listItem[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);

  const tabArray = [
    {
      label: t("全部"),
      value: "0",
    },
    {
      label: t("已购买"),
      value: "1",
    },
    {
      label: t("已发货"),
      value: "2",
    },
    {
      label: t("已完成"),
      value: "3",
    },
  ];

  const getGoodsList = async () => {
    setList([]);
    const result = await NetworkRequest({
      Url: "merchant/order/list",
      Method: "post",
      Data: {
        current: 1,
        size: 10,
        orderSn: inputValue,
        status: tabIndex == 0 ? null : tabIndex,
      },
    });
    if (result.success) {
      setList((prevList) => [...prevList, ...result.data.data.records]);
      if (result.data.data.records.length == 10) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
    }
  };
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "merchant/products",
      Method: "post",
      Data: {
        current: nexPage,
        size: 10,
        orderSn: inputValue,
        status: tabIndex == 0 ? null : tabIndex,
      },
    }).then((res) => {
      if (res.success) {
        setList((prevList) => [...prevList, ...res.data.data.records]);
        if (res.data.data.records.length == 10) {
          setIsMore(true);
        } else {
          setIsMore(false);
        }
      }
    });
  };
  const orderItemClick = (id) => {
    navigate(`/merchantOrder?id=${id}`);
  };
  useEffect(() => {
    getGoodsList();
  }, []);

  useEffect(() => {
    getGoodsList();
  }, [inputValue, tabIndex]);
  return (
    <div className="MerchantGoods">
      <div className="inputBox">
        <div className="searchIcon">
          <SearchOutline fontSize={14} color="rgba(255,255,255,0.35)" />
        </div>
        <Input
          placeholder={t("搜索订单")}
          className="inputClass"
          value={inputValue}
          onChange={(value) => setInputValue(value)}
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
        {list.length == 0 ? (
          <NoData />
        ) : (
          <div className="record-body">
            {list.map((item, index) => {
              return (
                <MerchantGoodsOrder data={item} onClickDetail={(id)=>orderItemClick(id)}></MerchantGoodsOrder>
              );
            })}

            <InfiniteScroll
              loadMore={loadMoreAction}
              hasMore={isMore}
            ></InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};
export default MerchantGoods;
