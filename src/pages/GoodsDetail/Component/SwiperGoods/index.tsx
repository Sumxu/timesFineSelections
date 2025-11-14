import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper } from "antd-mobile";
const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div className="content" style={{ background: color }}>
      {index + 1}
    </div>
  </Swiper.Item>
));
const SwiperGoods: React.FC = () => {
  return (
        <div className="swiperBox">
          <Swiper
            indicator={(total, current) => (
              <div className="customIndicator">
                {`${current + 1} / ${total}`}
              </div>
            )}
          >
            {items}
          </Swiper>
        </div>
  );
};
export default SwiperGoods;
