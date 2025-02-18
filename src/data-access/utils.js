const convertImagesToBase64 = (recipes) => {
    if (!Array.isArray(recipes)) {
      recipes = [recipes];
    }
    const results = [];
    recipes.forEach((recipe) => {
      if (recipe?.images?.data) {
        recipe.images.data = `data:image/jpeg;base64,${recipe.images.data.toString('base64')}`;
      }
      results.push(recipe);
    });
    return results;
  };
  
  module.exports = convertImagesToBase64;
  