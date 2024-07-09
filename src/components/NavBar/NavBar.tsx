import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectTotalQuantity } from '../../store/basketSlice/basketSlice';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <nav className={styles.navBar}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/basket">
          Basket
          {(
            <span className={styles.basketCount}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
