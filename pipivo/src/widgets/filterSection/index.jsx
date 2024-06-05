import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import { MaterialIcons } from "react-web-vector-icons";
import { FilterItemButton } from "./ui";
import { useNavigate } from "react-router-dom";

const FilterSection = ({
  nPrice = [0, 1000],
  nRating = [0, 5],
  nType = [],
  setNPrice,
  setNRating,
  setNType,
  fromSearchPage = false,
  maxPrice = 1000,
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(nPrice);
  const [rating, setRating] = useState(nRating);
  const [type, setType] = useState(nType);

  return (
    <section style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <div>
        <h2 className="filter-title">Type</h2>
        <div className="filter-section">
          <FilterItemButton
            isActiveN={type.includes("Lager")}
            title="Lager"
            setType={setType}
          />
          <FilterItemButton
            isActiveN={type.includes("Lager")}
            title="Ale"
            setType={setType}
          />
          <FilterItemButton
            isActiveN={type.includes("Lager")}
            title="Light"
            setType={setType}
          />
          <FilterItemButton
            isActiveN={type.includes("Lager")}
            title="Dark"
            setType={setType}
          />
          <FilterItemButton
            isActiveN={type.includes("Lager")}
            title="Filtered"
            setType={setType}
          />
        </div>
      </div>
      <div>
        <h2 className="filter-title">Cost</h2>
        <span className="filter-price">
          {`From ${price[0]}₴ to ${price[1]}₴`}
        </span>
        <div
          style={{ maxWidth: 430, marginTop: 12 }}
          className="filter-section"
        >
          <RangeSlider
            value={price}
            onInput={setPrice}
            min={0}
            max={maxPrice}
            step={0.1}
          />
        </div>
      </div>
      <div>
        <h2 className="filter-title">Rating</h2>
        <span className="filter-price">
          {`From ${rating[0]} to ${rating[1]}`}
        </span>
        <div
          style={{ maxWidth: 430, marginTop: 12 }}
          className="filter-section"
        >
          <RangeSlider
            value={rating}
            onInput={setRating}
            min={0}
            max={5}
            step={0.1}
          />
        </div>
        <button
          onClick={() => {
            if (fromSearchPage) {
              setNPrice(price);
              setNRating(rating);
              setNType(type.map((el) => el.toLowerCase()));
            } else {
              navigate("/search", { state: { price, rating, type } });
            }
          }}
          className="hero-button"
        >
          <span>Find my beer </span>
          <MaterialIcons name="navigate-next" size={32} color="#fff" />{" "}
        </button>
      </div>
    </section>
  );
};
export default FilterSection;
