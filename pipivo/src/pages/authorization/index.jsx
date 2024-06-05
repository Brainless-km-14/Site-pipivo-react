import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SiginInWithEmailForm, SignInWithGoogle } from "../../widgets";
import { LoadingDots } from "../../shared";

const AuthorizationPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        height: 1,
        flexDirection: "column",
        backgroundColor: "#8f8f8f",
      }}
      alignItems="center"
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <SiginInWithEmailForm
            setLoading={setLoading}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
          />
          <span style={{ alignSelf: "center", marginBottom: 12, marginTop: 4 }}>
            or
          </span>
          <SignInWithGoogle isRegister={isRegister} />
        </>
      )}
    </Box>
  );
};

export default AuthorizationPage;
