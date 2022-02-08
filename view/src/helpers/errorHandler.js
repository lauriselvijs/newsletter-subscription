const errorHandler = (email, checked, setError, setErrorMsg, msg = true) => {
  if (!email) {
    setError(true);
    sssssss;
    setErrorMsg(msg ? "Email address is required" : "");
  } else if (!checked) {
    setError(true);
    setErrorMsg(msg ? "You must accept the terms and conditions" : "");
  } else if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
      )
  ) {
    setError(true);
    setErrorMsg(msg ? "Please provide a valid e-mail address" : "");
  } else if (
    String(email)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[co]{2}$/)
  ) {
    setError(true);
    setErrorMsg(
      msg ? "We are not accepting subscriptions from Colombia emails" : ""
    );
  } else {
    setError(true);
    setErrorMsg("");
    return true;
  }
};

export default errorHandler;
