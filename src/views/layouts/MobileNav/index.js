import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavMenus = ({ setShowMenu }) => {
  return (
    <div className={styles.section}>
      <div className={`${styles.container} ${styles.menus}`}>
        <Link
          to="/posts"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Home
        </Link>
        <Link
          to="/create"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Create Post
        </Link>
      </div>
    </div>
  );
};

const MobileNav = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <React.Fragment>
      <div>
        <div className={styles.container}>
          <GiHamburgerMenu className={styles.icon} onClick={handleClick} />
          <h1>
            mansion <span>global</span>
          </h1>
          <AiOutlineSearch className={styles.icon} />
        </div>
      </div>
      {showMenu && <MobileNavMenus setShowMenu={setShowMenu} />}
    </React.Fragment>
  );
};

export default MobileNav;
