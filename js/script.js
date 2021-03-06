const searchInput = document.getElementById("searchInput");
const btn = document.getElementById("randomMeal");
const result = document.getElementById("result");

let search = "";

const fetchSearch = async (url) => {
  meals = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`)
    .then((res) => res.json())
    .then((res) => res.meals);
};

const searchDisplay = async () => {
  await fetchSearch(search);
  if (meals == null) {
    result.innerHTML = '<span class="noResult">No result found</span>';
  }

  result.innerHTML = meals
    .map(
      (meal) =>
        ` 
      <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="info">
            <div>Origin: ${meal.strArea}</div>
            <div>Category: ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' />
        <div>Recipe:${meal.strInstructions}</div>
        <a href='${meal.strYoutube}' target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
      `
    )
    .join("");
};

searchInput.addEventListener("input", (e) => {
  search = `search.php?s=${e.target.value}`;
  searchDisplay();
});

// Random meal

const randomMealDisplay = async () => {
  await fetchSearch("random.php");

  result.innerHTML = meals.map(
    (meal) =>
      `
        <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
          <div class="info">
              <div>Origin: ${meal.strArea}</div>
              <div>Category: ${meal.strCategory}</div>
          </div>
          <img src='${meal.strMealThumb}' />
          <div>Recipe:${meal.strInstructions}</div>
          <a href='${meal.strYoutube}' target="_blank"><i class="fab fa-youtube"></i></a>
          </div>
      `
  );
};

randomMeal.addEventListener("click", randomMealDisplay);
