import "./index.scss";
import toolIcon1 from "@/assets/home/tools1.png";
import toolIcon2 from "@/assets/home/tools2.png";
import toolIcon3 from "@/assets/home/tools3.png";
import toolIcon4 from "@/assets/home/tools4.png";
interface toolsItem {
  name: string;
  iconPath: string;
}
const Banner: React.FC = () => {
  const toolsList: Array<toolsItem> = [
    {
      name: "安品区",
      iconPath: toolIcon4,
    },
    {
      name: "优品区",
      iconPath: toolIcon1,
    },
    {
      name: "臻品区",
      iconPath: toolIcon2,
    },
    {
      name: "兑换区",
      iconPath: toolIcon3,
    },
  ];
  return (
    <>
      <div className="tools-box">
        {toolsList.map((item, index) => {
          return (
            <div className="tools-item" key={index}>
              <img src={item.iconPath} className="item-icon"></img>
              <div className="item-name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Banner;
