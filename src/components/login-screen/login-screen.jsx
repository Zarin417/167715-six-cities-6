import React, {useRef} from "react";
import {Link, useHistory} from "react-router-dom";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../store/api-actions";
import {AppRoute} from "../../const";

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.USER);

  if (isLoggedIn) {
    history.push(AppRoute.ROOT);
  }

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    dispatch(logIn({
      email: emailRef.current.value,
      password: passwordRef.current.value
    }));

    history.push(AppRoute.ROOT);
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit = {(evt) => handleFormSubmit(evt)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={emailRef}
                  data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.ROOT}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
