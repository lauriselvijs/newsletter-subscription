import React from "react";
import PineappleLogo from "../images/logo_pineapple.svg";
import { Link } from "react-router-dom";
import "../styles/css/header.css";
import PropTypes from "prop-types";

function Header({
  classPineapplesLogo,
  classAbout,
  classHowItWorks,
  classContact,
  PineappleLogo,
  classEmailData,
}) {
  return (
    <>
      <img
        src={PineappleLogo}
        alt="pineapples"
        className={classPineapplesLogo}
      />
      <Link to={"/email-data"} className={classEmailData}>
        Email
      </Link>
      <a href="" className={classAbout}>
        About
      </a>
      <a href="" className={classHowItWorks}>
        How it works
      </a>
      <a href="" className={classContact}>
        Contact
      </a>
    </>
  );
}

Header.propTypes = {
  classPineapplesLogo: PropTypes.string,
  classAbout: PropTypes.string,
  classHowItWorks: PropTypes.string,
  classContact: PropTypes.string,
  PineappleLogo: PropTypes.string,
  classEmailData: PropTypes.string,
};

Header.defaultProps = {
  classPineapplesLogo: "pineapples-logo",
  classAbout: "about",
  classHowItWorks: "how-it-works",
  classContact: "contact",
  classEmailData: "email-data",
  PineappleLogo: { PineappleLogo },
};

export default Header;
