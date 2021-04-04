import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRoute} from "../../const";
import {logOut} from "../../store/api-actions";

const Header = () => {
  const dispatch = useDispatch();
  const {isLoggedIn, usersEmail} = useSelector((state) => state.USER);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" style={{display: `flex`}}>
                {
                  isLoggedIn
                    ? (
                      <>
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                          <div className="header__avatar-wrapper user__avatar-wrapper" />
                          <span className="header__user-name user__name">{usersEmail}</span>
                        </Link>
                        <button
                          style={{marginLeft: `10px`}}
                          onClick={
                            () => dispatch(logOut())
                          }>
                          Log Out
                        </button>
                      </>
                    ) : (
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__login">Sign in</span>
                      </Link>
                    )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
