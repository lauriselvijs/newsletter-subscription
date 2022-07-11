import React from "react"
import "../styles/css/text-area.css"
import PropTypes from "prop-types"

function TextArea ({ classHeader, classSubheader }) {
  return (
    <>
      <div className={classHeader}>Subscribe to newsletter</div>
      <div className={classSubheader}>
        Subscribe to our newsletter and get 10% discount on pineapple glasses.
      </div>
    </>
  )
}

TextArea.propTypes = {
  classHeader: PropTypes.string,
  classSubheader: PropTypes.string
}

TextArea.defaultProps = {
  classHeader: "header",
  classSubheader: "subheading"
}

export default TextArea
