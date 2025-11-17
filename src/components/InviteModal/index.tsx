import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import i18n, { t } from "i18next";
import ContractSend from "@/Hooks/ContractSend.ts";
import { Totast } from "@/Hooks/Utils.ts";
const InviteModal: React.FC = () => {
  // 是否显示绑定邀请人弹出层
  const [showBindFloat, setShowBindFloat] = useState<boolean>(false);
  // 绑定的邀请人地址
  const [inputAddress, setInputAddress] = useState<string>("");
  // 绑定按钮加载
  const [butLoading, setLoading] = useState<boolean>(false);

  // 获取邀请码
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const inviteUrlValue = query.get("invite") ? query.get("invite") : "";
  let inviteUrlArr: string[] = [];
  if (inviteUrlValue) {
    if (inviteUrlValue.indexOf("?") != -1) {
      inviteUrlArr = inviteUrlValue.split("?");
    } else {
      inviteUrlArr = [inviteUrlValue];
    }
  }
  const invite: string = inviteUrlArr[0];

  // 关闭绑定邀请人
  const closeBindFloat = () => {
    setShowBindFloat(false);
  };

  // 绑定按钮执行
  const bindInviteAction = async () => {
    if (!inputAddress) {
      Totast(t("请输入邀请人地址"), "warning"); //
      return;
    }
    setLoading(true);
    await ContractSend({
      tokenName: "IDO",
      methodsName: "bind",
      params: [inputAddress],
    }).then((res) => {
      if (res.value) {
        Totast(t("绑定成功"), "success"); // 绑定成功
        setShowBindFloat(false);
      }
    });
    setLoading(false);
  };

  return (
    <div className="InviteModalPage">
      {/*绑定邀请人*/}
      <Modal
        title=""
        open={showBindFloat}
        closable={true}
        onCancel={closeBindFloat}
        footer={null}
      >
        <div className="RestConnectWallBox">
          <div className="Title">{t("绑定邀请人")}</div>
          <div className="Message">{t("请在下方输入或粘贴邀请人地址！")}</div>
          <div className="inviteAddress">
            <input
              type="text"
              placeholder={t("请输入或粘贴邀请人地址！")}
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
            />
          </div>
          <div className="But">
            <Button
              type="primary"
              loading={butLoading}
              onClick={() => {
                bindInviteAction();
              }}
            >
              {t("绑定")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default InviteModal;
