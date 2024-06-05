import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../../widgets";
import FilterSection from "../../widgets/filterSection";
import { loadItems, updateRating } from "../../firebase/api.js";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const loadData = async ({ setData }) => {
  const data = await loadItems();
  setData(data);
  return data;
};

const findByString = ({ data, searchString }) => {
  if (!searchString) return data;

  return data.filter((el) => {
    return (
      el.name.toLowerCase().includes(searchString.toLowerCase())
    );
  });
};

const SearchPage = () => {
  const [searchString, setSearchString] = useState("");
  const auth = getAuth();
  const { state } = useLocation();
  const [maxPrice, setMaxPrice] = useState(1000);
  const { price, type, rating } = state; // Read values passed on state
  const [data, setData] = useState([]);
  const [isFilterSectionShown, setIsFilterSectionShown] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    price,
    type,
    rating,
  });
  console.log("filters", filters);
  useEffect(() => {
    loadData({ price, type, rating, setData }).then((data) => {
      setMaxPrice(data.toSorted((a, b) => b.price - a.price)[0].price);
    });
  }, []);

  useEffect(() => {
    console.log("data", data);
    console.log("filters", filters);
    setFilteredData(
      data.filter((el) => {
        return (
          filters.price[0] <= el.price &&
          el.price <= filters.price[1] &&
          (!el.rating ||
            (filters.rating[0] <= el.rating &&
              el.rating <= filters.rating[1])) &&
          (filters.type.length === 0 || filters.type.includes(el.type))
        );
      }),
    );
    console.log("filteredData", filteredData);
  }, [filters, data]);

  return (
    <main>
      <Navbar withSearchBar setSearchString={setSearchString} />
      <section style={{ display: "flex", flexDirection: "column" }}>
        {isFilterSectionShown && (
          <FilterSection
            maxPrice={maxPrice}
            fromSearchPage
            nPrice={filters.price || [0, maxPrice]}
            nRating={filters.rating || [0, 5]}
            nType={filters.type || []}
            setNPrice={(price) =>
              setFilters((prev) => {
                return { ...prev, price };
              })
            }
            setNType={(type) =>
              setFilters((prev) => {
                return { ...prev, type };
              })
            }
            setNRating={(rating) =>
              setFilters((prev) => {
                return { ...prev, rating };
              })
            }
          />
        )}
        <button
          onClick={() => {
            setIsFilterSectionShown((prev) => !prev);
          }}
        >
          {isFilterSectionShown ? "Hide" : "Show"} filters
        </button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            // Render items
            findByString({data: filteredData, searchString}).map((el) => {
              return (
                <div
                  key={el.id}
                  style={{
                    display: "flex",
                    marginBottom: 12,
                    gap: 12,
                    backgroundColor: "#fffaf1",
                    borderRadius: 12,
                  }}
                >
                  <img
                    src={el.photo}
                    alt={el.name}
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 32,
                      color: "#39250a !important",
                    }}
                  />
                  <div
                    style={{
                      padding: 12,
                      color: "#39250a",
                    }}
                  >
                    <h3>{el.name}</h3>
                    <p>{el.description}</p>
                    <p><strong>Price:</strong> {el.price}</p>
                    <p><strong>Rating:</strong> {el.rating}</p>
                    <p><strong>Type:</strong> {el.type}</p>
                    <StarRatings
                      rating={
                        (el?.raters &&
                          +el.raters[auth?.currentUser?.uid || ""]) ||
                        el?.rating ||
                        0
                      }
                      numberOfStars={5}
                      starRatedColor={
                        el?.raters && el.raters[auth?.currentUser?.uid || ""]
                          ? "gold"
                          : "blue"
                      }
                      starDimension="1.2rem"
                      changeRating={(some) => {
                        if (auth?.currentUser) {
                          console.log(124);
                          updateRating({
                            rating: some,
                            userId: auth.currentUser.uid,
                            id: el.id,
                            prevRating: el?.raters || {},
                            prevTotalRating: el?.rating || 0,
                          });
                        } else {
                          toast("You need to be logged in to rate beers");
                        }
                        console.log(some);
                        console.log(el?.rating);
                      }}
                      starSpacing="3px"
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
      </section>
    </main>
  );
};
export default SearchPage;

