import recipes from "../data/recipes.json";

class Recipe {
  constructor(id, title, ingredients, image, source) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.image = image;
    this.source = source;
  }
}

function GetExistingRecipes() {
  return recipes;
}

function GetRecipeById(id) {
  return recipes.find((r) => r.id === id);
}

export { Recipe, GetExistingRecipes, GetRecipeById };
