import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import copyIcon from "@/assets/my/copy.png";
import { t } from "i18next";
const MyTeam: React.FC = () => {
  return (
    <div className="myTeamPage">
      <LeftBackHeader title={t("我的团队")}></LeftBackHeader>
      <div className="teamContentBox">
        <div className="headerBox">
          <div className="itemOption">
            <div className="number">328</div>
            <div className="txt">{t('团队人数')}</div>
          </div>
          <div className="line"></div>
          <div className="itemOption">
            <div className="number">100</div>
            <div className="txt">{t('直推人数')}</div>
          </div>
        </div>
        <div className="box usdtInfo">
          <div className="usdtTxt">{t('小区业绩')}</div>
          <div className="usdtNumber">185,200.56 USDT</div>
          <div className="usdtEndOption">
            <div className="itemEnd">
              <span className="spn1">{t('团队等级')}：</span>
              <span className="spn2">S7</span>
            </div>

            <div className="itemEnd">
              <span className="spn1">{t('团队加速')}：</span>
              <span className="spn2">10%</span>
            </div>
          </div>
        </div>

        <div className="box inviteBox">
          <div className="inviteEnd">
            <span className="spn1">{t('邀请链接')}：</span>
            <span className="spn2">www.timetax.io/home/</span>
            <img src={copyIcon} className="copyIcon"></img>
          </div>
        </div>

        <div className="hintTeamListTxt">{t('团队列表')}</div>
        <div className="box teamList">
          <div className="teamHeaderOption">
            <div className="itemTxt">{t('钱包地址')}</div>
            <div className="itemTxt">{t('类型')}</div>
            <div className="itemTxt itemTxtRight">{t('贡献业绩')}(USDT)</div>
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
