import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/index.js";
import GoogleButton from "react-google-button";

function SignInWithGoogle({ isRegister = false }) {
  const navigate = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        navigate("/");
        signInWithCredential(auth, credential);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <GoogleButton
      onClick={signIn}
      type="light"
      label={`${isRegister ? "Register" : "Login"} with Google`}
      style={{ borderRadius: 25, overflow: "hidden" }}
    />
  );
}

export default SignInWithGoogle;
