import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OrderItem from "../../Components/OrderItem";
import OrderHeaderSearch from "../../Components/OrderHeaderSearch";
const Order: React.FC = () => {
  const navigate =useNavigate()
  const tabArray = [
    {
      label: "全部",
      value: "1",
    },
    {
      label: "已购买",
      value: "2",
    },
    {
      label: "已发货",
      value: "3",
    },
    {
      label: "已完成",
      value: "4",
    },
  ];
  const [tabIndex, setTabIndex] = useState<string>("1");
  const orderItemClick=()=>{
    navigate('/orderDetail')
  }
  return (
    <>
      <div className="order-page">
      <OrderHeaderSearch></OrderHeaderSearch>
        <div className="order-content-box">
          <div className="tab-box">
            {tabArray.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTabIndex(item.value)}
                  className={`tab-item ${
                    tabIndex == item.value && "tab-active-item"
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <div className="order-list-box">
            {
              [1,2,3,4,5,6].map((item,index)=>{
                return (
                  <OrderItem  key={index} onClickDetail={()=>orderItemClick()}></OrderItem>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
