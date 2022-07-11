import React from "react"
import "../styles/css/terms-of-service.css"
import PropTypes from "prop-types"

function TermsOfService ({
  handleCheckMark,
  checked,
  classCheckmark,
  classAgree
}) {
  return (
    <>
      <input
        onChange={() => handleCheckMark()}
        checked={checked}
        type="checkbox"
        className={classCheckmark}
      />
      <span className={classAgree}>
        I agree to{" "}
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            textDecoration: "underline"
          }}
        >
          terms of service
        </span>
      </span>
    </>
  )
}

TermsOfService.propTypes = {
  checked: PropTypes.bool,
  handleCheckMark: PropTypes.func,
  classCheckmark: PropTypes.string,
  classAgree: PropTypes.string
}

TermsOfService.defaultProps = {
  checked: false,
  classCheckmark: "checkmark",
  classAgree: "agree-text",
  handleCheckMark: () => {}
}

export default TermsOfService
