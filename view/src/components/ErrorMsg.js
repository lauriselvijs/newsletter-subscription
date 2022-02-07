import React from "react";
import "../styles/css/error-msg.css";
import PropTypes from "prop-types";

function ErrorMsg({ errorMsg, classError }) {
  return (
    <>
      <div className={classError}>{errorMsg}</div>
    </>
  );
}

ErrorMsg.propTypes = {
  errorMsg: PropTypes.string,
  classError: PropTypes.string,
};

ErrorMsg.defaultProps = {
  errorMsg: "Error",
  classError: "error-ms",
};

export default ErrorMsg;
