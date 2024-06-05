import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/index.js";
import { PasswordInput } from "./ui";
import { emailValidator } from "./lib";
import { BaseLink } from "../../shared";

function SiginInWithEmailForm({ setLoading, isRegister, setIsRegister }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const onChangeLogin = (text) => {
    setLogin(text.target.value);
  };
  const onChangePassword = (text) => {
    setPassword(text.target.value);
  };
  const onChangeRepeatPassword = (text) => {
    setRepeatPassword(text.target.value);
  };

  const onClickContinue = async () => {
    if (!emailValidator.test(login)) {
      toast("Invalid email!", { type: "error" });
      // showErrorToast("Invalid email!", "colored");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, login, password);
      navigate("/");
    } catch (e) {
      const errorCode = e?.code;
      switch (errorCode) {
        case "auth/wrong-password":
          toast("Wrong data!", { type: "error" });
          console.log("Wrong password!");
          break;
        case "auth/user-not-found":
          toast("User in`t registered.", { type: "error" });
          console.log("User in`t registered.");
          break;
        default:
          toast("Something went wrong.", { type: "error" });
          console.log("Something went wrong.");
          break;
      }
    }
    setLoading(false);
  };
  const onClickRegister = async () => {
    if (password !== repeatPassword) {
      toast("Passwords do not match", { type: "error" });
      console.log("Passwords do not match");
      return;
    }
    if (!emailValidator.test(login)) {
      console.log("Invalid email!", { type: "error" });
      toast("Invalid email!", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, login, password);
      setLoading(false);
      navigate("/");
    } catch (e) {
      const errorCode = e?.code;
      setLoading(false);
      switch (errorCode) {
        case "auth/weak-password":
          toast("Weak password!", { type: "error" });
          console.log("Weak password!");
          break;
        case "auth/email-already-in-use":
          toast("User already exist", { type: "error" });
          console.log("User already exist");
          break;
        default:
          toast("Something went wrong.", { type: "error" });
          console.log("Something went wrong.");
          break;
      }
    }
  };

  return (
    <form className={"authorization-container"}>
      <div style={{ alignSelf: "center" }}>
        <h2>Authorization</h2>
      </div>
      <div>Login</div>
      <input
        type="text"
        value={login}
        onChange={onChangeLogin}
        style={{
          borderColor: "#686D76",
        }}
      />
      <div>Password</div>
      <PasswordInput value={password} onChange={onChangePassword} />

      {isRegister && (
        <>
          <div>Repeat Password</div>
          <PasswordInput
            value={repeatPassword}
            onChange={onChangeRepeatPassword}
          />
        </>
      )}
      <BaseLink
        style={{
          alignSelf: "flex-end",
          fontSize: "12px",
          color: "#040404",
          textAlign: "center",
          borderRadius: 10,
        }}
        onClick={() => {
          setIsRegister((prevState) => !prevState);
        }}
      >
        {!isRegister ? "Create account" : "Sign in"}
      </BaseLink>
      <BaseLink
        style={{
          fontSize: "16px",
          color: "#fff",
          textAlign: "center",
          marginTop: 2,
          padding: 5,
          backgroundColor: "#DC5F00",
          borderRadius: 10,
        }}
        onClick={isRegister ? onClickRegister : onClickContinue}
      >
        {isRegister ? "Register" : "Login"}
      </BaseLink>
    </form>
  );
}

export default SiginInWithEmailForm;
