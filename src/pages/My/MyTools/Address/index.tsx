import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import edit from "@/assets/address/edit.png";
import del from "@/assets/address/del.png";
import LeftBackHeader from "@/components/LeftBackHeader";
import { t } from "i18next";
const Address: React.FC = () => {
  const navigate = useNavigate();
  const editClick = () => {
    navigate("/editAddress");
  };
  return (
    <div className="addressPage">
      <LeftBackHeader title={t("选择收货地址")} />
      <div className="addressContent">
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return (
            <div className="addressItem" key={index}>
              <div className="addressLeft">
                <div className="addressNameTel">
                  <span className="spn1">王传福 18690088588</span>
                  <span className="spn2">{t('默认')}</span>
                </div>
                <div className="addressDetail">
                  湖南省长沙市岳麓区 麓谷街道和馨园社区西
                </div>
              </div>
              <div className="addressLine"></div>
              <div className="addressRight">
                <img
                  src={edit}
                  className="editIcon"
                  onClick={() => editClick()}
                ></img>
                <img src={del} className="delIcon"></img>
              </div>
            </div>
          );
        })}
      </div>
      <div className="addressBtnBox">
        <div className="addressBtn">+{t('添加收货地址')}</div>
      </div>
    </div>
  );
};
export default Address;
