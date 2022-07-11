import React, { useState, useEffect } from "react";
import "../../styles/css/main-view-mobile.css";
import ImageSummerMobile from "../../images/image_summer.png";
import errorHandler from "../../helpers/errorHandler";
import Header from "../Header";
import Success from "../Success";
import PineappleLogoMobile from "../../images/mobile/logo_pineapple_mobile.svg";
import TextArea from "../TextArea";
import Input from "../Input";
import TermsOfService from "../TermsOfService";
import SocialIcons from "../SocialIcons";

function MainVIew() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisable] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (errorHandler(email, checked, setError, setErrorMsg, isFocused)) {
      setSubmitButtonDisable(false);
    }
  }, [email, checked, isFocused]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (email && checked) {
      setError(false);
      setSuccess(true);
    }
  };

  const handleCheckMark = () => {
    setChecked(!checked);
  };

  const handleInputErrors = () => {
    setIsFocused(true);
  };

  return (
    <div className="mobile">
      <Header
        classPineapplesLogo={"pineapples-logo-mobile"}
        classAbout={"about-mobile"}
        classHowItWorks={"how-it-works-mobile"}
        classContact={"contact-mobile"}
        PineappleLogo={PineappleLogoMobile}
        classEmailData={"email-data-mobile"}
      />
      <div className="base-section-mobile">
        <span className="content-mobile"></span>
        {success ? (
          <>
            <Success
              classHeadingSuc={"success-ms-heading-mobile"}
              classSubheadingSuc={"success-ms-subheading-mobile"}
              classICSuccess={"ic-success-mobile"}
            />
          </>
        ) : (
          <>
            <TextArea
              classHeader={"header-mobile"}
              classSubheader={"subheading-mobile"}
            />
            <Input
              email={email}
              setEmail={(e) => setEmail(e)}
              handleInputErrors={(e) => handleInputErrors(e)}
              submitButtonDisabled={submitButtonDisabled}
              handleEmailSubmit={(e) => handleEmailSubmit(e)}
              classInputBox={"input-box-mobile"}
              classICArrow={"ic-arrow-mobile"}
            />
            {error ? <div className="error-ms-mobile">{errorMsg}</div> : ""}
            <div className="vertical-line-mobile"></div>
            <TermsOfService
              handleCheckMark={() => handleCheckMark()}
              checked={checked}
              classCheckmark={"checkmark-mobile"}
              classAgree={"agree-text-mobile"}
            />
            <div className="horizontal-line-mobile"></div>
          </>
        )}
        <div className="base-section-mobile">
          <span className="content-mobile"></span>
          <SocialIcons
            classFacebookIcon={"facebook-icon-mobile"}
            classInstagramIcon={"instagram-icon-mobile"}
            classTwitterIcon={"twitter-icon-mobile"}
            classYoutubeIcon={"youtube-icon-mobile"}
          />
        </div>
      </div>
      <img
        src={ImageSummerMobile}
        alt="pineapples"
        className="image-summer-mobile"
      />
    </div>
  );
}

export default MainVIew;
