import React from "react"
import "../styles/css/social-icons.css"
import PropTypes from "prop-types"

function SocialIcons ({
  classFacebookIcon,
  classInstagramIcon,
  classTwitterIcon,
  classYoutubeIcon
}) {
  return (
    <>
      <div className={classFacebookIcon} />
      <div className={classInstagramIcon} />
      <div className={classTwitterIcon} />
      <div className={classYoutubeIcon} />
    </>
  )
}

SocialIcons.propTypes = {
  classFacebookIcon: PropTypes.string,
  classInstagramIcon: PropTypes.string,
  classTwitterIcon: PropTypes.string,
  classYoutubeIcon: PropTypes.string
}

SocialIcons.defaultProps = {
  classFacebookIcon: "facebook-icon",
  classInstagramIcon: "instagram-icon",
  classTwitterIcon: "twitter-icon",
  classYoutubeIcon: "youtube-icon"
}

export default SocialIcons
