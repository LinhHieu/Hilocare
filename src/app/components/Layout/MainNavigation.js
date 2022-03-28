import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import {AiFillCaretLeft} from 'react-icons/ai';
import {SidebarData} from'./SidebarData'
import classes from './MainNavigation.module.css';
import AuthContext from '../context/auth_context';
import SubMenu from './SubMenu';

const MainNavigation = (props) => {
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  const authen = useContext(AuthContext);
  const isLoggedIn = authen.isLoggedIn;

  const LogoutHandler = () => {
    authen.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='#' className={classes.sidebaricon} >
        <FaIcons.FaBars  onClick={props.openclick} />
      </Link>
      <Link to='/'>
        <div className={classes.logo}>Hilocare</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/Profile'>Đổi mật khẩu</Link>
          </li>
          <li>
            <button onClick={LogoutHandler}>Đăng xuất</button>
          </li>
        </ul>
      </nav>
      <nav className={`${classes.sidebarnav} ${props.sidebar=='open' ? classes.active : null}`} sidebar={props.sidebar}>
        <div className={classes.sidebarwrap}>
          <Link className={classes.sidebaricon} to='#'>
            <AiFillCaretLeft  onClick={props.hideclick} />
          </Link>
          {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
