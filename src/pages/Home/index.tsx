import "./index.scss";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import homeBg from "@/assets/img/home-bg.png";
import soulNode from "@/assets/img/soul-node.png";
import union from "@/assets/img/union.png";
import homeTickets from "@/assets/img/home-tickets.png";
import homeSwap from "@/assets/img/home-swap.png";
import homeZc from "@/assets/img/home-zc.png";
import { useLocation } from "react-router-dom";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import homeNode from "@/assets/img/home-node.png";
import star from "@/assets/img/star.png";
import aboutToken from "@/assets/img/about-token.png";
import proportion from "@/assets/img/token-proportion.png";
import React, { useEffect, useState } from "react";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
import { Drawer, Spin } from "antd";
import { Totast, fromWei, SubAddress } from "@/Hooks/Utils.ts";
import { t } from "i18next";
import BuyTicketPage from "./component/BuyTicketPage/index.tsx";

/**
 * 渲染排行榜前三名（自定义顺序 + 自动补默认值）
 * 顺序要求：
 *  top1 -> 第2条
 *  top2 -> 第1条
 *  top3 -> 第3条
 */ const renderTop3 = (rankArray: { key?: string; value?: any }[] = []) => {
  // 确保至少有 3 条数据，不足则补默认
  const filledArray = [
    ...rankArray.slice(0, 3),
    ...Array(Math.max(0, 3 - rankArray.length)).fill({ key: "-", value: "-" }),
  ].slice(0, 3);

  // 按你指定的顺序重排
  const order = [1, 0, 2];
  const orderedArray = order.map(
    (i) => filledArray[i] || { key: "-", value: "-" }
  );

  return orderedArray.map((item, index) => {
    const valueText =
      item?.value && item.value !== "-" ? fromWei(item.value) : "-";
    const addressText =
      item?.key && item.key !== "-" ? SubAddress(item.key) : "-";

    return (
      <div key={index} className={`top3-box top${index + 1}`}>
        <span className="amount">{valueText}</span>
        <span className="unit">USDT</span>
        <span className="address">{addressText}</span>
      </div>
    );
  });
};
const renderLast7 = (rankArray: { key?: string; value?: any }[] = []) => {
  const slicedArray = rankArray.slice(3, 10);
  const filledArray = [
    ...slicedArray,
    ...Array(Math.max(0, 7 - slicedArray.length)).fill({
      key: "-",
      value: "-",
    }),
  ].slice(0, 7);

  return filledArray.map((rank, index) => {
    const displayIndex = index + 4;
    const address = rank?.key && rank.key !== "-" ? SubAddress(rank.key) : "-";
    const amount =
      rank?.value && rank.value !== "-" ? fromWei(rank.value) : "-";

    return (
      <div key={index} className="rank-item">
        <span className="rank-num">{displayIndex}</span>
        <span className="rank-address">{address}</span>
        <span className="rank-amount">
          {amount}
          {amount !== "-" && <span className="unit">USDT</span>}
        </span>
      </div>
    );
  });
};

const HomeTitle: React.FC<{
  className?: string;
  text1: string;
  text2: string;
}> = ({ className, text1, text2 }) => {
  return (
    <div className={`home-title ${className}`}>
      <div className="text1">
        <img src={star} className="star-img" alt="" />
        <span>{text1}</span>
      </div>
      <div className="text2">{text2}</div>
    </div>
  );
};
const PageBody: React.FC = () => {
  const navigate = useNavigate();

  // 获取邀请码
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const inviteUrlValue = query.get("invite") ? query.get("invite") : "";

  const rankArray = [
    {
      id: 1,
      key: "0x747Ae925759Be1596Cb2aA40b50B3265d73599A1",
      value: "10000000000000000000",
    },
  ];
  //排行榜数据
  const [rankList, setRankList] = useState([]);

  const [rankIndex, setRankIndex] = useState<number>(0);
  const rankTabList = [
    {
      label: t("投资榜"),
      value: 0,
    },
    {
      label: t("爆块榜"),
      value: 1,
    },
    {
      label: t("推荐榜"),
      value: 2,
    },
  ];
  const [rankLoading, setRankLoading] = useState<boolean>(false);
  let inviteUrlArr: string[] = [];

  if (inviteUrlValue) {
    if (inviteUrlValue.indexOf("?") != -1) {
      inviteUrlArr = inviteUrlValue.split("?");
    } else {
      inviteUrlArr = [inviteUrlValue];
    }
  }
  const invite: string = inviteUrlArr[0];
  if (invite) {
    //有邀请人则进行回显
    localStorage.setItem("invite", invite);
  }
  // 控制显示是否显示购买门票
  const [showBuyTicket, setShowBuyTicket] = useState(false);

  const rankTabClick = (item) => {
    setRankIndex(item.value);
  };

  //门票弹窗是否展示事件
  const buyTicketIsShowChange = (val: boolean) => {
    setShowBuyTicket(val);
  };
  const navigatePath = (path) => {
    Totast(t("敬请期待"), "warning");
  };
  const getRankList = () => {
    let Url=''
    if(rankIndex==0){
      Url='/statistics/investment'
    }
     if(rankIndex==1){
      Url='/statistics/blockExplosion'
    }
     if(rankIndex==2){
      Url='/statistics/invitation'
    }
    setRankLoading(true);
    NetworkRequest({
      Url
    }).then((res) => {
      if(res.data.code==200){
        setRankList(res.data.data)
      }
    }).finally(()=>{
        setRankLoading(false);
    });
  
  };
  useEffect(() => {
    //rankTab切换了 重新请求数据
    getRankList();
  }, [rankIndex]);
  return (
    <div className="home-page">
      <Header showLogo showConnect />
      <div className="project-info">
        <img src={homeBg} className="home-bg" alt="" />
        <div className="project-content">
          <img src={soulNode} className="soul-node" alt="" />
          <div className="ai-network">{t("全球多场景AI分布式推理网络")}</div>
          <div className="effect">
            <div className="effect-text1">
              {t("连接游戏")} · {t("娱乐")} · {t("金融的算力高速公路")}
            </div>
            <img src={union} className="union-img" alt="" />
            <div className="effect-text2">
              {t("让每个人都能参与AI时代的收益分配")}
            </div>
          </div>
          <div className="home-tab">
            <div
              className="tab-item"
              onClick={() => buyTicketIsShowChange(true)}
            >
              <img src={homeTickets} className="tab-icon" alt="" />
              <span>{t("门票")}</span>
            </div>
            <div onClick={() => navigate("/swap")} className="tab-item">
              <img src={homeSwap} className="tab-icon" alt="" />
              <span>{t("交易")}</span>
            </div>
            <div onClick={() => navigate("/crowd")} className="tab-item">
              <img src={homeZc} className="tab-icon" alt="" />
              <span>{t("众筹")}</span>
            </div>
            <div onClick={() => navigate("/myNode")} className="tab-item">
              <img src={homeNode} className="tab-icon" alt="" />
              <span>{t("节点")}</span>
            </div>
          </div>
        </div>
      </div>
      <HomeTitle
        className="about-token"
        text1={t("关于Token")}
        text2={t("CA Token用于CloudFAi整个生态的流通")}
      />
      <img src={aboutToken} className="about-token-img" alt="" />

      <div className="token-info">
        <div className="token-row">
          <span className="key">{t("Token名称：")}</span>
          <span className="val">{t("CloudFAi（简称：CA）")}</span>
        </div>
        <div className="token-row">
          <span className="key">{t("发行总量")}：</span>
          <span className="val">21{t("亿枚")}</span>
        </div>
        <div className="proportion-box">
          <img src={proportion} className="proportion-img" alt="" />
          <div className="proportion-item left">
            <div className="label">LP</div>
            <div className="num">1{t("%")}</div>
          </div>
          <div className="proportion-item center">
            <div className="label">{t("Ai算力池")}</div>
            <div className="num">98{t("%")}</div>
          </div>
          <div className="proportion-item right">
            <div className="label">{t("基金会")}</div>
            <div className="num">1{t("%")}</div>
          </div>
        </div>
      </div>
      <HomeTitle text1={t("排行榜")} text2={t("参与CloudFAi生态的TOP10榜单")} />
      <div className="rank-box">
        <div className="rank-tab">
          {rankTabList.map((item) => {
            return (
              <div
              key={item.value}
                onClick={() => rankTabClick(item)}
                className={`tab-item ${ 
                  rankIndex == item.value ? "active" : ""
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
        {rankLoading ? (
          <div className="loding flex flexCenter ranking-body">
            <Spin />
          </div>
        ) : (
          <div>
            <div className="top3-info">{renderTop3(rankList)}</div>
            <div className="rank-list">
              <div className="rank-head">
                <span>{t("排名")}</span>
                <span>{t("用户")}</span>
                <span>{t("总投资")}</span>
              </div>
              <div className="rank-body">{renderLast7(rankList)}</div>
            </div>
          </div>
        )}
      </div>

      <Drawer
        rootClassName="buyNodeDrawer"
        maskClosable={true}
        destroyOnHidden={true}
        height={"auto"}
        closeIcon={false}
        open={showBuyTicket}
        title=""
        placement="bottom"
      >
        <BuyTicketPage onClose={() => buyTicketIsShowChange(false)} />
      </Drawer>
    </div>
  );
};
const Home: React.FC = () => {
  // 当前钱包地址
  const wallertAddress = userAddress().address;

  useEffect(() => {
    if (!wallertAddress) {
      ensureWalletConnected();
    }
  }, [wallertAddress]);

  return (
    <>
      <div className="view">
        {wallertAddress ? (
          <PageBody />
        ) : (
          <div className="loding">
            <Spin />
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
