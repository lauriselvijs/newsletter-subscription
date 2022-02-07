import React from "react";
import PropTypes from "prop-types";

function EmailInfo({ email: { email_name, created_at }, onDelete }) {
  return (
    <>
      <tr>
        <td title="Click to delete" onClick={() => onDelete()}>
          {email_name}
        </td>
        <td>{created_at}</td>
      </tr>
    </>
  );
}

EmailInfo.propTypes = {
  email: PropTypes.object,
  onFiltre: PropTypes.func,
};

EmailInfo.defaultProps = {
  email: { email_name: "test@gmail.com", created_at: "01/01/2000" },
  onFiltre: () => {},
};

export default EmailInfo;
