import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BaseLink } from "../../shared";
import { Navbar } from "../../widgets/index.jsx";
import { toast } from "react-toastify";
import { setBeer, getMaxId } from "../../firebase/api.js"; // Припустимо, що у вас є функція getMaxId, яка отримує найбільший ID з бази даних

const FilterItemButton = ({ title, setType }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      key={title}
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

const AddBeerPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhotoURL] = useState("");
  const [type, setType] = useState([]);
  const [id, setId] = useState(""); // Змінено з "id1" на пустий рядок

  const raters = [];
  const rating = 0;

  useEffect(() => {
    // Отримати найбільший ID з бази даних і встановити його +1 для нового елемента
    getMaxId().then((maxId) => {
      setId(maxId + 1);
    });
  }, []);

  const onChangePrice = (text) => {
    setPrice(+text.target.value);
  };
  const onChangeName = (text) => {
    setName(text.target.value);
  };
  const onChangePhoto = (text) => {
    setPhotoURL(text.target.value);
  };
  const onChangeID = (text) => {
    setId(text.target.value);
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          height: 0.9,
          flexDirection: "column",
          backgroundColor: "#8f8f8f",
        }}
        alignItems="center"
      >
        {
          <form
            style={{ maxWidth: "45%", alignItems: "center" }}
            className={"authorization-container"}
          >
            <div style={{ alignSelf: "center" }}>
              <h2>Add beer</h2>
            </div>
            <div>Name</div>
            <input
              type="text"
              value={name}
              onChange={onChangeName}
              style={{
                borderColor: "#686D76",
              }}
            />
            <div>Price</div>
            <input
              type="number"
              value={price}
              onChange={onChangePrice}
              style={{
                borderColor: "#686D76",
              }}
            />
            <div>photoURL</div>
            <input
              type="text"
              value={photo}
              onChange={onChangePhoto}
              style={{
                borderColor: "#686D76",
              }}
            />
            <div>ID</div>
            <input
              type="text"
              value={id}
              onChange={onChangeID}
              style={{
                borderColor: "#686D76",
              }}
            />
          </form>
        }
        <div
          style={{
            display: "flex",
            marginTop: 12,
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
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
        <BaseLink
          style={{
            fontSize: "16px",
            color: "#fff",
            textAlign: "center",
            marginTop: 8,
            padding: 12,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: "#DC5F00",
            borderRadius: 10,
          }}
          onClick={() => {
            if (!name || !price || !photo || !type || !id) {
              toast("Fill all fields", { type: "error" });
              return;
            }
            const beer = {
              name,
              price,
              photo,
              type,
              id,
              rating,
              raters,
            };
            setBeer({ id, beer });
            setId(""); // Очищення поля ID після додавання
            setType([]);
            setPrice(0);
            setPhotoURL("");
            setName("");
            toast("Beer added", { type: "info" });
          }}
        >
          Add beer
        </BaseLink>
      </Box>
    </>
  );
};

export default AddBeerPage;
