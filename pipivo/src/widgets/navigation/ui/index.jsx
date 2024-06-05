import { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/index.js";

export function DropdownButton({ children, title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          color: "#fff",
          fontSize: "2.2rem",
        }}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {children}
      </Menu>
    </div>
  );
}

export function BeerButton() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-haspopup="true"
        onClick={() => {
          navigate("/search", {
            state: { type: [], price: [0, 1000], rating: [0, 5] },
          });
        }}
        style={{
          color: "#fff",
          fontSize: "2.2rem",
        }}
      >
        BEER
      </Button>
    </div>
  );
}

export function IconButton() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-haspopup="true"
        onClick={() => {
          navigate("/");
        }}
        style={{
          color: '#03E29F',
          fontSize: "2.2rem",
        }}
      >
        PIPIVO
      </Button>
    </div>
  );
}

export function AccountButton() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unSubscribeFromAuth = onAuthStateChanged(auth, (userInstance) => {
      setUser(userInstance);
    });
    return () => {
      unSubscribeFromAuth();
    };
  }, []);
  return (
    <DropdownButton title={"ACCOUNT"}>
      {!user ? (
        <MenuItem
          onClick={() => {
            navigate("/auth");
          }}
        >
          Sign in
        </MenuItem>
      ) : (
        <>
          <MenuItem
            onClick={() => {
              if (user) {
                navigate("/rated");
              } else {
                navigate("/auth");
              }
            }}
          >
            My account
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (user) {
                navigate("/rated");
              } else {
                navigate("/auth");
              }
            }}
          >
            Rated beer
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await auth.signOut();
              navigate("/add");
              setUser(null);
            }}
          >
            Add beer
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await auth.signOut();
              navigate("/");
              setUser(null);
            }}
          >
            Logout
          </MenuItem>
        </>
      )}
    </DropdownButton>
  );
}
