import React from "react"
import "../../styles/css/email-button.css"
import PropTypes from "prop-types"

function EmailButton ({ buttonName, onFiltre }) {
  return (
    <div>
      <button onClick={() => onFiltre()} className="email-button">
        {buttonName}
      </button>
    </div>
  )
}

EmailButton.propTypes = {
  buttonName: PropTypes.string,
  onFiltre: PropTypes.func
}

EmailButton.defaultProps = {
  buttonName: "Button",
  onFiltre: () => {}
}

export default EmailButton
