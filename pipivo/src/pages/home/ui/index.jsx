import { useNavigate } from "react-router-dom";
import { MaterialIcons } from "react-web-vector-icons";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Discover the Right Beer</h1>
        <p className="hero-description">
          The best place to find the perfect beer for you
        </p>

        <button
          onClick={() => {
            navigate("/search", {
              state: { type: [], price: [0, 1000], rating: [0, 5] },
            });
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
