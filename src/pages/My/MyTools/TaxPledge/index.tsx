import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import { Input } from "antd-mobile";
const TaxPledge: React.FC = () => {
  const navigate=useNavigate()
      const [inputNumber, setInputNumber] = useState<string>("");
      const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
    
  return (
    <>
      <div className="TaxPledgePage">
        <LeftBackHeader title="TAX质押"></LeftBackHeader>
        <div className="headerBox">
          <div className="headerTopOption">
            <div className="itemNumber">
              <div className="number">328.56</div>
              <div className="txt">质押数量(TAX)</div>
            </div>
            <div className="line"></div>
            <div className="itemNumber">
              <div className="number">328.56</div>
              <div className="txt">获得收益(TAX)</div>
            </div>
          </div>
          <div className="btn-option">
            <div className="btn black-bg">赎回</div>
            <div className="btn white-bg" onClick={()=>navigate('/taxList')}>记录</div>
          </div>
        </div>
        <div className="contentBox">
          <div className="topOption">
            <span className="leftSpn">质押TAX</span>
            <span className="rightSpn">余额：2,805.78</span>
          </div>
          <div className={`input-option ${isFocus ? "input-focus" : ""}`}>
            <Input
              placeholder="请输入内容"
              value={inputNumber}
              onChange={(val) => {
                setInputNumber(val);
              }}
              onFocus={() => setIsFocus(true)} // ✅ 获得焦点
              onBlur={() => setIsFocus(false)} // ✅ 失去焦点
              clearable
              className="input-class"
            />
            <div className="input-txt">TAX</div>
          </div>
          <div className="topOption margin-top-24">
            <span className="leftSpn">预计日收益：</span>
            <span className="rightSpn whiteTxt">0.55 TAX</span>
          </div>
          <div className="btnOption">确认质押</div>
        </div>
      </div>
    </>
  );
};
export default TaxPledge;
