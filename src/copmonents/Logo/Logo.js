import React from "react";
import { CSSTransition } from "react-transition-group";
import fadeLogo from "./fadeLogo.module.css";

const Logo = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      classNames={fadeLogo}
      timeout={500}
      unmountOnExit
    >
      <h2 className={fadeLogo.title}>Phonebook</h2>
    </CSSTransition>
  );
};

export default Logo;
