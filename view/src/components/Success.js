import React from "react";
import "../styles/css/success.css";
import ICSuccess from "../images/ic_success.svg";
import PropTypes from "prop-types";

function Success({ classHeadingSuc, classSubheadingSuc, classICSuccess }) {
  return (
    <>
      <img className={classICSuccess} src={ICSuccess} alt="Success logo" />
      <div className={classHeadingSuc}>Thanks for subscribing!</div>
      <div className={classSubheadingSuc}>
        You have successfully subscribed to our email listing. Check your email
        for the discount code.
      </div>
    </>
  );
}

Success.propTypes = {
  classHeadingSuc: PropTypes.string,
  classSubheadingSuc: PropTypes.string,
  classICSuccess: PropTypes.string,
};

Success.defaultProps = {
  classHeadingSuc: "ic-success",
  classSubheadingSuc: "success-heading",
  classICSuccess: "success-subheading",
};

export default Success;
