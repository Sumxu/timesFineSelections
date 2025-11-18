import "./index.scss";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import { t } from "i18next";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { InfiniteScroll } from "antd-mobile";
import NoData from "@/components/NoData";
const AssetDetails: React.FC = () => {
  const tabArray = [
    {
      label: "TUSD",
      value: "1",
    },
    {
      label: "USD",
      value: "2",
    },
    {
      label: "TAX",
      value: "3",
    },
    {
      label: t("积分"),
      value: "4",
    },
  ];
  const [list, setList] = useState([]);
  // 是否还有更多数据可以加载
  const [isMore, setIsMore] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<string>("1");
  // 获取更多
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "account/record",
      Method: "post",
      Data: {
        current: nexPage,
        size: 10,
        coinType: tabIndex,
      },
    }).then((res) => {
      if (res.success) {
        setList((prevList) => [...prevList, ...res.data.data.records]);
        if (res.data.data.records.length == dataParam.size) {
          setIsMore(true);
        } else {
          setIsMore(false);
        }
      }
    });
  };
  //加载数据
  const getDataPage = async () => {
    setList([]);
    const result = await NetworkRequest({
      Url: "account/record",
      Method: "post",
      Data: {
        current: 1,
        size: 10,
        coinType: tabIndex,
      },
    });
    console.log("result===", result);
    if (result.success) {
      setList((prevList) => [...prevList, ...result.data.data.records]);
      if (result.data.data.records.length == 10) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
    }
  };

  useEffect(() => {
    getDataPage();
  }, []);
  return (
    <>
      <div className="asset-details-page">
        <LeftBackHeader title={t("资产明细")}></LeftBackHeader>
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
        <div className="asset-details-list-box">
          <div className="header-list-box">
            <div className="header-item">{t("时间")}</div>
            <div className="header-item item-center">{t("类型")}</div>
            <div className="header-item">{t("数量")}</div>
          </div>
          <div className="list-box">
            {list.length == 0 ? (
              <NoData />
            ) : (
              <div className="record-body">
                {list.map((item, index) => {
                  return (
                    <div className="list-item-box" key={index}>
                      <div className="item-option date">
                        2025-09-23 18:36:56
                      </div>
                      <div className="item-option item-center">
                        <div>{t("积分释放")}</div>
                        <div>200.00 TAX</div>
                      </div>
                      <div className="item-option">+32.56</div>
                    </div>
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
      </div>
    </>
  );
};
export default AssetDetails;
