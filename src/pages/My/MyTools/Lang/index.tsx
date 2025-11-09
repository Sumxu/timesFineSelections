import React, { useState } from "react";
import "./index.scss";
import LeftBackHeader from "@/components/LeftBackHeader";
import langCheck from "@/assets/lang/langCheck.png";
import langNoCheck from "@/assets/lang/langNoCheck.png";
const LangPage: React.FC = () => {
  const langList = [
    {
      label: "简体中文",
      value: "zh",
      id: "1",
    },
    {
      label: "繁体中文",
      value: "zhHant",
      id: "2",
    },
    {
      label: "English",
      value: "en",
      id: "3",
    },
  ];
  const [langIndex, setLangIndex] = useState<string>("");
  const setLangClick = (item) => {
    console.log("1000",item)
    setLangIndex(item.id);
  };
  return (
    <div className="langPage">
      <LeftBackHeader title="语言设置" />
      <div className="box">
        {langList.map((item, index) => {
          return (
            <div
              key={index}
              className={`boxInfoItem ${langList.length-1!=index&&'boxInfoBottomBorder'}`}
              onClick={() => setLangClick(item)}
            >
              <div className="leftLabel">{item.label}</div>
              <div className="rightBox">
                {item.id == langIndex ? (
                  <img src={langCheck} className="checkIcon"></img>
                ) : (
                  <img src={langNoCheck} className="checkIcon"></img>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LangPage;
