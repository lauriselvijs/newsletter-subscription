import React from "react"
import "../styles/css/input.css"
import ICArrow from "../images/ic_arrow.svg"
import PropTypes from "prop-types"

function Input ({
  email,
  setEmail,
  handleInputErrors,
  submitButtonDisabled,
  handleEmailSubmit,
  classInputBox,
  classICArrow
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Type your email address here…"
        className={classInputBox}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={(e) => handleInputErrors(e)}
      />
      <input
        type="image"
        disabled={submitButtonDisabled}
        onClick={(e) => handleEmailSubmit(e)}
        src={ICArrow}
        alt="arrow"
        className={classICArrow}
      />
    </>
  )
}

Input.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  handleInputErrors: PropTypes.func,
  submitButtonDisabled: PropTypes.bool,
  handleEmailSubmit: PropTypes.func,
  classInputBox: PropTypes.string,
  classICArrow: PropTypes.string
}

Input.defaultProps = {
  email: "Email",
  setEmail: () => {},
  handleInputErrors: () => {},
  submitButtonDisabled: true,
  handleEmailSubmit: () => {},
  classInputBox: "input-box",
  classICArrow: "ic-arrow"
}

export default Input
