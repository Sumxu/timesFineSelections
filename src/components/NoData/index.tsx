import "./index.scss";
import React from "react";
import { t } from "i18next";
const NoData: React.FC = () => {
  return (
    <div className="no-data">
      <span>{t("暂无数据")}</span>
    </div>
  )
};
export default NoData;
