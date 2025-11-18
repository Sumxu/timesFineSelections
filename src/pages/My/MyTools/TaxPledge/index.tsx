import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import { Input } from "antd-mobile";
import { t } from "i18next";
import RedemptionPopup from "@/components/Popup/RedemptionPopup";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { InfiniteScroll } from "antd-mobile";
import NoData from "@/components/NoData";
const TaxPledge: React.FC = () => {
  const navigate = useNavigate();
  const [inputNumber, setInputNumber] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
  const [list, setList] = useState<listItem[]>([]);
  // 是否还有更多数据可以加载
  const [isMore, setIsMore] = useState<boolean>(false);

  const [current, setCurrent] = useState<number>(1);
  const [redemptionShow, setRedemptionShow] = useState<boolean>(false);

  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "userRecord/ticketRecord",
      Data: {
        current: nexPage,
        size: 10,
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

  return (
    <div className="TaxPledgePage">
      <LeftBackHeader title={t("TAX质押")}></LeftBackHeader>
      <div className="headerBox">
        <div className="headerTopOption">
          <div className="itemNumber">
            <div className="number">328.56</div>
            <div className="txt">{t("质押数量")}(TAX)</div>
          </div>
          <div className="line"></div>
          <div className="itemNumber">
            <div className="number">328.56</div>
            <div className="txt">{t("获得收益")}(TAX)</div>
          </div>
        </div>
        <div className="btn-option">
          <div className="btn black-bg" onClick={() => setRedemptionShow(true)}>
            {t("质押")}
          </div>
        </div>
      </div>
      <div className="hintTeamListTxt">{t("质押列表")}</div>
      <div className="box teamList">
        {list.length > 0 ? (
          <NoData />
        ) : (
          <div className="record-body">
            {[1, 1, 1].map((item, index) => {
              return (
                <div className="teamListBox" key={index}>
                  <div className="teamItem">
                    <div className="itemTxt">
                      <div className="itemOption">
                        投入时间:<span>12312321</span>
                      </div>
                      <div className="itemOption">
                        投入值:<span>12312321</span>
                      </div>
                    </div>
                    <div className="itemTxt">
                      <div className="itemOption">
                        {" "}
                        待领取收益:<span>12312321</span>
                      </div>
                      <div className="itemOption">
                        已领取收益:<span>12312321</span>
                      </div>
                    </div>
                    <div className="itemTxt">
                      <div className="btn btnOne">赎回</div>
                      <div className="btn btnTwo">领取收益</div>
                    </div>
                  </div>
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
      <RedemptionPopup
        isShow={redemptionShow}
        onClose={() => setRedemptionShow(false)}
      ></RedemptionPopup>
    </div>
  );
};
export default TaxPledge;
