import "./index.scss";
import logo from '@/assets/login/logo.png'
import { SearchOutline} from 'antd-mobile-icons'
const Header: React.FC = () => {
  return (
    <>
        <div className="header-search-option">
            <img src={logo} className="logo-icon"></img>
            <div className="input-option">
                <SearchOutline fontSize={16} color="#A8AAA9"/>
                <span className="spn-1">搜索您想要的商品</span>
            </div>
          </div>
    </>
  );
};
export default Header;
