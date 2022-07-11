import React, { useState, useEffect } from "react";
import "../styles/css/main-view.css";
import ImageSummer from "../images/image_summer.png";
import errorHandler from "../helpers/errorHandler";
import Success from "../components/Success";
import Header from "./Header";
import SocialIcons from "../components/SocialIcons";
import TextArea from "./TextArea";
import Input from "../components/Input";
import TermsOfService from "../components/TermsOfService";
import ErrorMsg from "../components/ErrorMsg";
import PineappleLogo from "../images/logo_pineapple.svg";

function MainView() {
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

    if (email !== "" && checked) {
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
    <div className="desktop">
      <div className="base-section">
        <Header
          classPineapplesLogo={"pineapples-logo"}
          classAbout={"about"}
          classHowItWorks={"how-it-works"}
          classContact={"contact"}
          PineappleLogo={PineappleLogo}
          classEmailData={"email-data"}
        />
        {success ? (
          <>
            <Success
              classHeadingSuc={"success-heading"}
              classSubheadingSuc={"success-subheading"}
              classICSuccess={"ic-success"}
            />
          </>
        ) : (
          <>
            <TextArea classHeader={"header"} classSubheader={"subheading"} />
            <Input
              email={email}
              setEmail={(e) => setEmail(e)}
              handleInputErrors={(e) => handleInputErrors(e)}
              submitButtonDisabled={submitButtonDisabled}
              handleEmailSubmit={(e) => handleEmailSubmit(e)}
              classInputBox={"input-box"}
              classICArrow={"ic-arrow"}
            />
            {error ? (
              <ErrorMsg errorMsg={errorMsg} classError="error-ms" />
            ) : (
              ""
            )}
            <div className="vertical-line"></div>
            <TermsOfService
              handleCheckMark={() => handleCheckMark()}
              checked={checked}
              classCheckmark={"checkmark"}
              classAgree={"agree-text"}
            />
          </>
        )}

        <div className="horizontal-line"></div>
        <SocialIcons
          classFacebookIcon={"facebook-icon"}
          classInstagramIcon={"instagram-icon"}
          classTwitterIcon={"twitter-icon"}
          classYoutubeIcon={"youtube-icon"}
        />
      </div>
      <img src={ImageSummer} alt="pineapples" className="image-summer" />
    </div>
  );
}

export default MainView;
