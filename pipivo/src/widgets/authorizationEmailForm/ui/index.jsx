import { useState } from "react";
import HideIcon from "@mui/icons-material/NoEncryptionRounded";
import ShowIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { BaseLink } from "../../../shared/index.jsx";

export const PasswordInput = ({ value, onChange }) => {
  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <input
        type={isPasswordShown ? "text" : "password"}
        value={value}
        style={{
          borderColor: "#686D76",
        }}
        onChange={onChange}
      />
      <BaseLink
        style={{
          position: "absolute",
          right: "0.6rem",
          top: "0.8rem",
          color: "#a2a2a2",
        }}
        onClick={() => {
          setPasswordShown((prevState) => !prevState);
        }}
      >
        {isPasswordShown ? (
          <HideIcon style={{ fontSize: "24px" }} />
        ) : (
          <ShowIcon style={{ fontSize: "24px" }} size={32} />
        )}
      </BaseLink>
    </div>
  );
};
