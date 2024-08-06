import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import { FaHome, FaUser, FaCog, FaBook, FaDoorOpen } from 'react-icons/fa';
import styles from './sidebar.module.css'; // Corrected import for CSS modules

const Sidebar = () => {
  const [hovered, setHovered] = useState(null);
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      setActiveMenu('Dashboard');
    } else if (location.pathname === '/admin/buletin') {
      setActiveMenu('Buletin');
    } else if (location.pathname === '/admin/settings') {
      setActiveMenu('Settings');
    } else if (location.pathname === '/admin/logout') {
      setActiveMenu('Logout');
    }
  }, [location.pathname]);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className="font-inter font-semibold text-[22px] text-white">Admin Panel</h1>
      </div>
      <nav className={styles.navMenu}>
        {[
          { icon: <FaHome />, text: 'Dashboard', path: '/admin' },
          { icon: <FaBook />, text: 'Buletin', path: '/admin/buletin' },
          { icon: <FaDoorOpen />, text: 'Logout', path: '/admin/logout' }
        ].map((item, index) => (
          <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
            <div
              className={`${styles.button} ${hovered === index ? styles.buttonHover : ''} ${activeMenu === item.text ? styles.activeMenu : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.text}>{item.text}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
