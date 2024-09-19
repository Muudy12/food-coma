import "./FoodDetail.scss";
import recipes from "../../data/recipes.json";
import { useEffect, useState } from "react";
import arrowDown from "../../assets/icons/arrow-down.png";

function FoodDetail({ closeModal, selectedFood }) {
  const typeName = selectedFood.name.toLowerCase();
  const [typeRecipes, setTypeRecipes] = useState([]);

  useEffect(() => {
    const allRecipes = recipes.filter((r) => r.type.toLowerCase() === typeName);

    if (allRecipes) {
      setTypeRecipes(allRecipes);
    }
  }, []);

  return (
    <>
      <div className="food-coma__modal modal">
        <div className="modal__container">
          <button className="modal__close-btn" onClick={closeModal}>
            CLOSE
          </button>
          <div className="modal-title">
            <img
              className="modal-title__img"
              src={selectedFood.img}
              alt={selectedFood.name}
            />
            <div className="modal-title__details details">
              <h3 className="details__heading">
                You have landed on '{selectedFood.name}' recipes!
              </h3>
              <p className="details__text">{selectedFood.text}</p>
            </div>
          </div>
          <RecipeList typeRecipes={typeRecipes} />
        </div>
      </div>
    </>
  );
}

function RecipeList({ typeRecipes }) {
  const [selected, setSelected] = useState("");

  return (
    <>
      {!selected && (
        <div className="recipe-list">
          {typeRecipes?.map((r) => {
            return (
              <div
                className="recipe-item"
                key={r.id}
                onClick={() => setSelected(r)}
              >
                <img src={r.image} alt={`image for the recipe ${r.title}`} />
              </div>
            );
          })}
        </div>
      )}
      {selected && (
        <div className="recipe-selected">
          <h3 className="title">
            <img
              src={arrowDown}
              alt="Return to List Arrow"
              onClick={() => setSelected("")}
            />
            {selected.title}
          </h3>

          <div className="details">
            <img
              className="details-image"
              src={selected.image}
              alt={`Selected Recipe '${selected.title}' Image`}
            />
            <ul className="details__ingredients">
              {selected.ingredients.map((i, index) => {
                return <li key={index}>{i}</li>;
              })}
            </ul>
          </div>
          <p className="source" onClick={() => window.open(selected.source)}>
            For more information on how to cook the recipe.
          </p>
        </div>
      )}
    </>
  );
}
export default FoodDetail;
