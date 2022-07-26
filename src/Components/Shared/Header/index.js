import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './header.module.css';

const userOff = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user?.data);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === user._id
  );
  let indexOfLastSlash = location.pathname.lastIndexOf('/');
  let isID = location.pathname.slice(indexOfLastSlash + 1).length === 24;
  let idTitle = location.pathname.slice(
    location.pathname.slice(0, indexOfLastSlash).lastIndexOf('/') + 1,
    indexOfLastSlash - 1
  );

  return (
    <header>
      <div className={styles.pathname}>
        {isID
          ? `${idTitle}: ${location.pathname.slice(indexOfLastSlash + 1)}`
          : location.pathname.slice(indexOfLastSlash + 1)}
      </div>
      <NavLink to={'/employee/profile'} exact className={styles.user}>
        <div className={styles.userPicture}>
          {employee?.picture ? (
            <img src={employee.picture} className={styles.userLogged} />
          ) : employee ? (
            userOff
          ) : null}
        </div>
        <p>
          {employee?.firstName} {employee?.lastName}
        </p>
      </NavLink>
    </header>
  );
};

export default Header;
