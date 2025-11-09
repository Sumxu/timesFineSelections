import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import { Switch, Input } from "antd-mobile";
const Addresss: React.FC = () => {
  return (
    <div className="addressEditPage">
      <LeftBackHeader title="新增收货地址" />
      <div className="addressContent">
        <div className="box">
          <div className="addressInfoItem addressInfoBottomBorder">
            <div className="leftLabel">姓名</div>
            <div className="rightContent">
              <Input
                placeholder="输入收货人姓名"
                clearable
                style={{
                  "--font-size":"14px",
                  "--color":"#fff",
                  "--placeholder-color": "rgba(84, 79, 79, 0.35)",
                }}
              />
            </div>
          </div>

           <div className="addressInfoItem addressInfoBottomBorder">
            <div className="leftLabel">手机号</div>
            <div className="rightContent">
              <Input
                placeholder="输入手机号"
                clearable
                style={{
                  "--font-size":"14px",
                  "--color":"#fff",
                  "--placeholder-color": "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>


           <div className="addressInfoItem addressInfoBottomBorder">
            <div className="leftLabel">所在地区</div>
            <div className="rightContent">
              <Input
                placeholder="输入省市区"
                clearable
                style={{
                  "--font-size":"14px",
                  "--color":"#fff",
                  "--placeholder-color": "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>


           <div className="addressInfoItem">
            <div className="leftLabel">详细地址</div>
            <div className="rightContent">
              <Input
                placeholder="输入详细地址"
                clearable
                style={{

                  "--font-size":"14px",
                  "--color":"#fff",
                  "--placeholder-color": "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="box settingCheck">
          <div className="leftItem">设为默认</div>
          <div className="rightItem">
            <Switch
              defaultChecked
              className="switchCss"
              style={{
                "--checked-color": "#0be72f",
                "--height": "16px",
                "--width": "32px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="addressBtnBox">
        <div className="addressBtn">保存</div>
      </div>
    </div>
  );
};
export default Addresss;
