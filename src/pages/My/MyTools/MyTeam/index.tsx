import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import copyIcon from "@/assets/my/copy.png";
import { t } from "i18next";
import { userAddress } from "@/Store/Store.ts";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { Totast } from "@/Hooks/Utils.ts";
const levelMap = [
  { performance: 10000, accelerate: 10, level: "1" },
  { performance: 50000, accelerate: 15, level: "2" },
  { performance: 200000, accelerate: 20, level: "3" },
  { performance: 600000, accelerate: 25, level: "4" },
  { performance: 1500000, accelerate: 30, level: "5" },
  { performance: 5000000, accelerate: 35, level: "6" },
];

const MyTeam: React.FC = () => {
  const [location, setLocation] = useState(""); //网页地址

  const wallertAddress = userAddress().address;

  const [teamInfo, setTeamInfo] = useState<object>({});

  function getLevel(level: number) {
    return levelMap.filter((item) => level >= item).pop() || null;
  }

  const getDataPage = async () => {
    const result = await NetworkRequest({
      Url: "team/info",
      Method: "get",
    });
    if (result.success) {
      setTeamInfo(result.data.data);
    }
  };

  const copyAction = () => {
    //获取window浏览器地址
    const input = document.createElement("textarea");
    input.value = location + "?invite=" + wallertAddress;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    Totast("复制成功", "success"); // 复制成功
  };
  useEffect(() => {
    getDataPage();
    setLocation(window.location.origin);
  }, []);
  return (
    <div className="myTeamPage">
      <LeftBackHeader title={t("我的团队")}></LeftBackHeader>
      <div className="teamContentBox">
        <div className="headerBox">
          <div className="itemOption">
            <div className="number">{teamInfo.teamCount}</div>
            <div className="txt">{t("团队人数")}</div>
          </div>
          <div className="line"></div>
          <div className="itemOption">
            <div className="number">{teamInfo.directCount}</div>
            <div className="txt">{t("直推人数")}</div>
          </div>
        </div>
        <div className="box usdtInfo">
          <div className="usdtTxt">{t("小区业绩")}</div>
          <div className="usdtNumber">{teamInfo.communityPerf} USDT</div>
          <div className="usdtEndOption">
            {teamInfo.level == 0 ? (
              "暂无团队"
            ) : (
              <>
                <div className="itemEnd">
                  <span className="spn1">{t("团队等级")}：</span>
                  <span className="spn2">
                    S{getLevel(teamInfo.level)?.level}
                  </span>
                </div>

                <div className="itemEnd">
                  <span className="spn1">{t("团队加速")}：</span>
                  <span className="spn2">
                    {getLevel(teamInfo.level)?.accelerate}%
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="box inviteBox">
          <div className="inviteEnd">
            <span className="spn1">{t("邀请链接")}：</span>
            <span className="spn2">{location}</span>
            <img
              src={copyIcon}
              className="copyIcon"
              onClick={() => {
                copyAction();
              }}
            ></img>
          </div>
        </div>

        <div className="hintTeamListTxt">{t("团队列表")}</div>
        <div className="box teamList">
          <div className="teamHeaderOption">
            <div className="itemTxt">{t("钱包地址")}</div>
            <div className="itemTxt">{t("类型")}</div>
            <div className="itemTxt itemTxtRight">{t("贡献业绩")}(USDT)</div>
          </div>
          {[1, 2, 3, 4, 7, 5, 6].map((item, index) => {
            return (
              <div className="teamListBox">
                <div className="teamItem">
                  <div className="itemTxt">0x325…0086</div>
                  <div className="itemTxt">2025-09-23 18:36:56</div>
                  <div className="itemTxt txtUsdt itemTxtRight">10,390.00</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MyTeam;
