import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import i18n, { t } from "i18next";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { Totast, isValidAddress, concatSign } from "@/Hooks/Utils.ts";
import { userAddress } from "@/Store/Store";
import { UseSignMessage } from "@/Hooks/UseSignMessage.ts";
import { storage } from "@/Hooks/useLocalStorage";

interface PropsClass {
  isShow: boolean;
  onClose: () => void;
}
const InviteModal = (Props: PropsClass) => {
  const navigate = useNavigate();
  const { signMessage } = UseSignMessage(); //获取钱包签名
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
    Props.onClose();
  };

  // 绑定按钮执行
  const bindInviteAction = async () => {
    if (!inputAddress) {
      Totast(t("请输入邀请人地址"), "warning"); //
      return;
    }
    setLoading(true);
    const currentAddress = userAddress.getState().address;
    const bigRes = concatSign(currentAddress);
    const sigResult = await signMessage(bigRes);
    if (!sigResult) {
      return setLoading(false);
    }
    //判断当前邀请人格式是否正确
    if (isValidAddress(inputAddress)) {
      await NetworkRequest({
        Url: "auth/login",
        Method: "post",
        Data: {
          address: currentAddress,
          inviteAddress: inputAddress,
          msg: bigRes,
          signature: sigResult,
        },
      }).then((res) => {
        if (res.success) {
          //成功后直接进入首页
          storage.set("token", res.data.data);
          navigate("/home");
        }
      });
    } else {
      //提示无效地址
      Totast(t("邀请人地址无效"), "warning"); //
    }
    setLoading(false);
  };

  return (
    <div className="InviteModalPage">
      {/*绑定邀请人*/}
      <Modal
        title=""
        open={Props.isShow}
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
