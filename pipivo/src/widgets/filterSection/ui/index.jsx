import { useState } from "react";

export const FilterItemButton = ({ title, isActiveN = false, setType }) => {
  const [isActive, setIsActive] = useState(isActiveN);

  return (
    <button
      onClick={() => {
        setType((prevState) => {
          if (prevState.includes(title)) {
            return prevState.filter((item) => item !== title);
          } else {
            return [...prevState, title];
          }
        });
        setIsActive((prevState) => !prevState);
      }}
      className={isActive ? "filter-item-button-active" : "filter-item-button"}
    >
      {title}
    </button>
  );
};
