import classes from './MainNavigation.module.css';
import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false); 
    const showSubnav = () => setSubnav(!subnav);
    return (
      <>
        <Link className={classes.sidebarlink} to={item.path || '#'} onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <label className={classes.sidebarlabel}>{item.title}</label>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpen
              : item.subNav
              ? item.iconClose
              : null}
          </div>
        </Link>
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <Link to={item.path || '#'} key={index} className={classes.dropdownlink}>
                {item.icon}
                <label className={classes.sidebarlabel}>{item.title}</label>
              </Link>
            );
          })}
      </>
    );
  };
  
  export default SubMenu;