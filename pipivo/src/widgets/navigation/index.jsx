import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { AccountButton, BeerButton, IconButton } from "./ui";
import { Feather } from "react-web-vector-icons";
import { Button } from "@mui/material";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const appName = "Pipivo";

const NavbarDesktop = ({withSearchBar = false, setSearchString= ()=>{}}) => {
  const navigate = useNavigate();
  const [inputValue, setValue] = useState("");
  const onInputChange = (e) => {
    setValue(e.target.value);
    setSearchString(e.target.value);
  };
  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "1.11rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <IconButton />
      {
      withSearchBar && <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        value={inputValue}
        style={{
          padding: "0.5rem",
          width: 240,
          borderRadius: "0.5rem",
          border: "1px solid #ddd",
        }}
      />
      }
      <div style={{ display: "flex", gap: 18, paddingRight: 12 }}>
        <BeerButton />
        <AccountButton />
      </div>
    </nav>
  );
};

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav
        style={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
          justifyContent: "space-between",
          paddingBottom: "1rem",
          paddingTop: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
          className="burger-menu-button"
        >
          <Feather name="menu" size={30} color="#fff" />
        </button>
        <input type="text" placeholder="Search" className="search-input" />
        <button
          style={{
            opacity: 0,
          }}
          className="burger-menu-button-disabled"
        >
          <Feather name="menu" size={30} color="#fff" />
        </button>
      </nav>

      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="mobile-menu-modal"
        >
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "transparent",
              border: "none",
            }}
            className="close-button"
          >
            <Feather name="x" size={32} color="#fff" />
          </button>
          <div className="mobile-menu">
            <h2 className="menu-title">{appName.toUpperCase()}</h2>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="menu-item"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/search", {
                  state: { type: [], price: [], rating: [] },
                });
              }}
              className="menu-item"
            >
              Beer
            </button>
            <button
              onClick={() => {
                navigate("/about");
              }}
              className="menu-item"
            >
              About
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Navbar({
  withSearchBar = false,
  setSearchString = () => {},
}) {
  const [width] = useWindowSize();
  return width > 768 ? (
    <NavbarDesktop
      withSearchBar={withSearchBar}
      setSearchString={setSearchString}
    />
  ) : (
    <MobileNavbar />
  );
}
