const SUBSTITUTIONS = {
  milk: ["soy milk", "almond milk"],
  butter: ["olive oil", "ghee"],
  egg: ["banana", "yogurt"],
  chicken: ["paneer", "tofu"],
  paneer: ["tofu"],
  yogurt: ["curd"],
  wheat_flour: ["rice flour", "gluten-free flour"],
  rice: ["quinoa"],
  cheese: ["paneer", "tofu"],
  cream: ["coconut milk"],
  bread: ["roti"],
};

// Very small synonym map for matching names
const INGREDIENT_SYNONYMS = {
  curd: "yogurt",
  yoghurt: "yogurt",
  maida: "wheat flour",
  roti: "flatbread",
  chapati: "flatbread",
};

function normalizeIngredientName(name) {
  const base = name.trim().toLowerCase();
  return INGREDIENT_SYNONYMS[base] || base;
}

// Recipe structure:
// id, name, cuisine, ingredients (name, quantity, unit), dietTags, difficulty,
// cookingTime, servings, instructions[], nutritionPerServing{}, coreIngredients[]
const RECIPES = [
  {
    id: "veg-pulao",
    name: "Vegetable Pulao",
    cuisine: "Indian",
    ingredients: [
      { name: "rice", quantity: 150, unit: "g" },
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "onion", quantity: 0.5, unit: "cup" },
      { name: "tomato", quantity: 0.5, unit: "cup" },
      { name: "oil", quantity: 1, unit: "tbsp" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "water", quantity: 300, unit: "ml" },
    ],
    dietTags: ["vegetarian", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 30,
    servings: 2,
    instructions: [
      "Rinse rice and soak for 15 minutes.",
      "Saute onion, tomato and mixed vegetables in oil.",
      "Add spices, salt, rice and water.",
      "Cook covered until rice is fluffy.",
    ],
    nutritionPerServing: { calories: 350, protein: 8, carbs: 60, fat: 8 },
    coreIngredients: ["rice", "mixed vegetables"],
  },
  {
    id: "paneer-bhurji",
    name: "Paneer Bhurji",
    cuisine: "Indian",
    ingredients: [
      { name: "paneer", quantity: 150, unit: "g" },
      { name: "onion", quantity: 0.5, unit: "cup" },
      { name: "tomato", quantity: 0.5, unit: "cup" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    instructions: [
      "Heat oil and saute onion until golden.",
      "Add tomato and spices, cook until soft.",
      "Add crumbled paneer and cook for 5 minutes.",
    ],
    nutritionPerServing: { calories: 280, protein: 15, carbs: 8, fat: 20 },
    coreIngredients: ["paneer"],
  },
  {
    id: "masala-omelette",
    name: "Masala Omelette",
    cuisine: "Indian",
    ingredients: [
      { name: "egg", quantity: 2, unit: "" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "tomato", quantity: 0.25, unit: "cup" },
      { name: "chili", quantity: 1, unit: "" },
      { name: "oil", quantity: 1, unit: "tsp" },
    ],
    dietTags: ["gluten-free"],
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    instructions: [
      "Beat eggs with salt and spices.",
      "Mix in chopped onion, tomato and chili.",
      "Cook on oiled pan until set.",
    ],
    nutritionPerServing: { calories: 220, protein: 14, carbs: 4, fat: 16 },
    coreIngredients: ["egg"],
  },
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    cuisine: "Global",
    ingredients: [
      { name: "chicken", quantity: 200, unit: "g" },
      { name: "yogurt", quantity: 0.25, unit: "cup" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "lemon juice", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["gluten-free"],
    difficulty: "Medium",
    cookingTime: 35,
    servings: 2,
    instructions: [
      "Marinate chicken with yogurt, spices and lemon juice for 30 minutes.",
      "Grill or bake until cooked through.",
    ],
    nutritionPerServing: { calories: 260, protein: 28, carbs: 3, fat: 14 },
    coreIngredients: ["chicken"],
  },
  {
    id: "pasta-primavera",
    name: "Veggie Pasta Primavera",
    cuisine: "Italian",
    ingredients: [
      { name: "pasta", quantity: 120, unit: "g" },
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "cheese", quantity: 2, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Medium",
    cookingTime: 25,
    servings: 2,
    instructions: [
      "Boil pasta until al dente.",
      "Saute vegetables and garlic in olive oil.",
      "Toss pasta with veggies and cheese.",
    ],
    nutritionPerServing: { calories: 400, protein: 12, carbs: 65, fat: 10 },
    coreIngredients: ["pasta"],
  },
  {
    id: "tomato-soup",
    name: "Tomato Soup",
    cuisine: "Global",
    ingredients: [
      { name: "tomato", quantity: 3, unit: "" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "cream", quantity: 2, unit: "tbsp" },
      { name: "water", quantity: 300, unit: "ml" },
    ],
    dietTags: ["vegetarian", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 25,
    servings: 2,
    instructions: [
      "Saute onion and garlic.",
      "Add chopped tomatoes and cook until soft.",
      "Blend with water, simmer and finish with cream.",
    ],
    nutritionPerServing: { calories: 180, protein: 4, carbs: 18, fat: 10 },
    coreIngredients: ["tomato"],
  },
  {
    id: "chole",
    name: "Chole (Chickpea Curry)",
    cuisine: "Indian",
    ingredients: [
      { name: "chickpeas", quantity: 1, unit: "cup" },
      { name: "onion", quantity: 0.5, unit: "cup" },
      { name: "tomato", quantity: 0.5, unit: "cup" },
      { name: "spices", quantity: 1.5, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    difficulty: "Medium",
    cookingTime: 40,
    servings: 3,
    instructions: [
      "Cook soaked chickpeas until soft.",
      "Saute onion, tomato and spices.",
      "Add chickpeas and simmer.",
    ],
    nutritionPerServing: { calories: 260, protein: 10, carbs: 40, fat: 6 },
    coreIngredients: ["chickpeas"],
  },
  {
    id: "poha",
    name: "Kanda Poha",
    cuisine: "Indian",
    ingredients: [
      { name: "flattened rice", quantity: 1, unit: "cup" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "potato", quantity: 0.25, unit: "cup" },
      { name: "peanuts", quantity: 2, unit: "tbsp" },
      { name: "spices", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    instructions: [
      "Rinse poha and drain.",
      "Saute onion, potato and peanuts.",
      "Add poha, spices and lemon juice.",
    ],
    nutritionPerServing: { calories: 230, protein: 5, carbs: 35, fat: 7 },
    coreIngredients: ["flattened rice"],
  },
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    cuisine: "Indian",
    ingredients: [
      { name: "lentils", quantity: 0.75, unit: "cup" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "tomato", quantity: 0.25, unit: "cup" },
      { name: "ghee", quantity: 1, unit: "tbsp" },
      { name: "spices", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 30,
    servings: 3,
    instructions: [
      "Cook lentils until soft.",
      "Prepare tadka with ghee, onion, tomato and spices.",
      "Mix tadka into dal and simmer.",
    ],
    nutritionPerServing: { calories: 210, protein: 11, carbs: 28, fat: 6 },
    coreIngredients: ["lentils"],
  },
  {
    id: "salad",
    name: "Simple Veg Salad",
    cuisine: "Global",
    ingredients: [
      { name: "cucumber", quantity: 0.5, unit: "cup" },
      { name: "tomato", quantity: 0.5, unit: "cup" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "lemon juice", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    difficulty: "Easy",
    cookingTime: 10,
    servings: 2,
    instructions: ["Chop veggies, toss with salt and lemon juice."],
    nutritionPerServing: { calories: 60, protein: 2, carbs: 12, fat: 1 },
    coreIngredients: ["cucumber", "tomato"],
  },
  {
    id: "oats-porridge",
    name: "Oats Porridge",
    cuisine: "Global",
    ingredients: [
      { name: "oats", quantity: 0.5, unit: "cup" },
      { name: "milk", quantity: 1, unit: "cup" },
      { name: "banana", quantity: 1, unit: "" },
      { name: "nuts", quantity: 2, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    instructions: [
      "Cook oats in milk until soft.",
      "Top with sliced banana and nuts.",
    ],
    nutritionPerServing: { calories: 320, protein: 10, carbs: 50, fat: 10 },
    coreIngredients: ["oats"],
  },
  {
    id: "fried-rice",
    name: "Veg Fried Rice",
    cuisine: "Indo-Chinese",
    ingredients: [
      { name: "rice", quantity: 1, unit: "cup" },
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "soy sauce", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Medium",
    cookingTime: 25,
    servings: 2,
    instructions: [
      "Cook rice and cool.",
      "Stir fry vegetables.",
      "Add rice, soy sauce and toss.",
    ],
    nutritionPerServing: { calories: 330, protein: 6, carbs: 60, fat: 7 },
    coreIngredients: ["rice"],
  },
  {
    id: "chicken-curry",
    name: "Simple Chicken Curry",
    cuisine: "Indian",
    ingredients: [
      { name: "chicken", quantity: 250, unit: "g" },
      { name: "onion", quantity: 0.5, unit: "cup" },
      { name: "tomato", quantity: 0.5, unit: "cup" },
      { name: "spices", quantity: 1.5, unit: "tbsp" },
      { name: "oil", quantity: 1.5, unit: "tbsp" },
    ],
    dietTags: ["gluten-free"],
    difficulty: "Medium",
    cookingTime: 40,
    servings: 3,
    instructions: [
      "Saute onion and tomato with spices.",
      "Add chicken pieces and cook until done.",
    ],
    nutritionPerServing: { calories: 290, protein: 23, carbs: 6, fat: 18 },
    coreIngredients: ["chicken"],
  },
  {
    id: "lemon-rice",
    name: "Lemon Rice",
    cuisine: "South Indian",
    ingredients: [
      { name: "rice", quantity: 1, unit: "cup" },
      { name: "lemon juice", quantity: 2, unit: "tbsp" },
      { name: "peanuts", quantity: 2, unit: "tbsp" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    instructions: [
      "Cook rice.",
      "Prepare tempering with oil, spices and peanuts.",
      "Mix rice with tempering and lemon juice.",
    ],
    nutritionPerServing: { calories: 260, protein: 6, carbs: 42, fat: 8 },
    coreIngredients: ["rice"],
  },
  {
    id: "pancakes",
    name: "Simple Pancakes",
    cuisine: "Global",
    ingredients: [
      { name: "wheat flour", quantity: 0.75, unit: "cup" },
      { name: "milk", quantity: 1, unit: "cup" },
      { name: "egg", quantity: 1, unit: "" },
      { name: "butter", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Easy",
    cookingTime: 20,
    servings: 3,
    instructions: [
      "Whisk flour, milk and egg into batter.",
      "Cook small rounds on a greased pan.",
    ],
    nutritionPerServing: { calories: 230, protein: 8, carbs: 30, fat: 8 },
    coreIngredients: ["wheat flour"],
  },
  {
    id: "chilla",
    name: "Besan Chilla",
    cuisine: "Indian",
    ingredients: [
      { name: "gram flour", quantity: 0.75, unit: "cup" },
      { name: "onion", quantity: 0.25, unit: "cup" },
      { name: "tomato", quantity: 0.25, unit: "cup" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "gluten-free"],
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    instructions: [
      "Mix gram flour with water to make batter.",
      "Add veggies and spices.",
      "Cook like thin pancakes.",
    ],
    nutritionPerServing: { calories: 220, protein: 9, carbs: 26, fat: 7 },
    coreIngredients: ["gram flour"],
  },
  {
    id: "banana-shake",
    name: "Banana Milkshake",
    cuisine: "Global",
    ingredients: [
      { name: "banana", quantity: 1, unit: "" },
      { name: "milk", quantity: 1, unit: "cup" },
      { name: "sugar", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian"],
    difficulty: "Easy",
    cookingTime: 5,
    servings: 1,
    instructions: ["Blend banana, milk and sugar until smooth."],
    nutritionPerServing: { calories: 250, protein: 8, carbs: 40, fat: 6 },
    coreIngredients: ["banana", "milk"],
  },
  {
    id: "vegan-curry",
    name: "Coconut Veg Curry",
    cuisine: "Indian",
    ingredients: [
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "coconut milk", quantity: 0.75, unit: "cup" },
      { name: "spices", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    difficulty: "Medium",
    cookingTime: 30,
    servings: 2,
    instructions: [
      "Saute vegetables in oil.",
      "Add spices and coconut milk.",
      "Simmer until vegetables are cooked.",
    ],
    nutritionPerServing: { calories: 260, protein: 5, carbs: 16, fat: 20 },
    coreIngredients: ["mixed vegetables", "coconut milk"],
  },
  {
    id: "tofu-stirfry",
    name: "Tofu Stir-fry",
    cuisine: "Asian",
    ingredients: [
      { name: "tofu", quantity: 150, unit: "g" },
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "soy sauce", quantity: 1, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "vegan"],
    difficulty: "Medium",
    cookingTime: 20,
    servings: 2,
    instructions: [
      "Stir-fry tofu until golden.",
      "Add vegetables and soy sauce and cook.",
    ],
    nutritionPerServing: { calories: 230, protein: 13, carbs: 10, fat: 15 },
    coreIngredients: ["tofu"],
  },
  {
    id: "fruit-bowl",
    name: "Mixed Fruit Bowl",
    cuisine: "Global",
    ingredients: [
      { name: "banana", quantity: 1, unit: "" },
      { name: "apple", quantity: 1, unit: "" },
      { name: "orange", quantity: 1, unit: "" },
      { name: "nuts", quantity: 2, unit: "tbsp" },
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    difficulty: "Easy",
    cookingTime: 5,
    servings: 2,
    instructions: ["Chop fruits and mix.", "Top with chopped nuts."],
    nutritionPerServing: { calories: 150, protein: 3, carbs: 32, fat: 4 },
    coreIngredients: ["banana", "apple"],
  },
];

// ---------- STATE & STORAGE ----------

let userIngredients = new Set();
const ingredientChipsEl = document.getElementById("ingredient-chips");
const imageDetectResultEl = document.getElementById("image-detect-result");
const errorMsgEl = document.getElementById("error-msg");
const resultsCountEl = document.getElementById("results-count");
const recipesContainerEl = document.getElementById("recipes-container");
const suggestedContainerEl = document.getElementById("suggested-container");

// Ratings & favorites from localStorage
const STORAGE_KEY = "smartRecipePrefs";

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ratings: {}, favorites: [] };
  } catch (e) {
    return { ratings: {}, favorites: [] };
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    // storage might fail; ignore
  }
}

let prefs = loadPrefs();

// ---------- INGREDIENT CHIP RENDERING ----------

function renderIngredientChips() {
  ingredientChipsEl.innerHTML = "";
  if (userIngredients.size === 0) {
    ingredientChipsEl.classList.add("empty-state");
    ingredientChipsEl.textContent = "No ingredients yet. Add some!";
    return;
  }
  ingredientChipsEl.classList.remove("empty-state");
  userIngredients.forEach((ing) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `<span>${ing}</span><span class="remove" data-remove="${ing}">✕</span>`;
    ingredientChipsEl.appendChild(chip);
  });
}

ingredientChipsEl.addEventListener("click", (e) => {
  const toRemove = e.target.getAttribute("data-remove");
  if (toRemove) {
    userIngredients.delete(toRemove);
    renderIngredientChips();
  }
});

// ---------- ADD INGREDIENTS ----------

document.getElementById("add-ingredient-btn").addEventListener("click", () => {
  const val = document
    .getElementById("ingredient-input")
    .value.split(",")
    .map((v) => normalizeIngredientName(v))
    .filter((v) => v);
  val.forEach((v) => userIngredients.add(v));
  document.getElementById("ingredient-input").value = "";
  renderIngredientChips();
});

document.getElementById("ingredient-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("add-ingredient-btn").click();
  }
});

document.querySelectorAll(".chip-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const ing = normalizeIngredientName(btn.dataset.ingredient);
    userIngredients.add(ing);
    renderIngredientChips();
  });
});

// ---------- IMAGE "RECOGNITION" DEMO ----------

function detectIngredientsFromFilename(fileName) {
  const lower = fileName.toLowerCase();
  const keywords = [
    "tomato",
    "onion",
    "potato",
    "egg",
    "rice",
    "paneer",
    "chicken",
    "banana",
    "apple",
    "milk",
    "cucumber",
  ];
  const found = [];
  keywords.forEach((k) => {
    if (lower.includes(k)) {
      found.push(k);
    }
  });
  return found;
}

document.getElementById("detect-image-btn").addEventListener("click", () => {
  const fileInput = document.getElementById("image-input");
  const file = fileInput.files && fileInput.files[0];
  imageDetectResultEl.innerHTML = "";
  if (!file) {
    imageDetectResultEl.textContent = "Please choose an image file first.";
    return;
  }

  const recognized = detectIngredientsFromFilename(file.name);
  if (recognized.length === 0) {
    imageDetectResultEl.textContent =
      "No known ingredients detected from file name. Try naming image like 'tomato_onion.jpg'.";
    return;
  }

  recognized.forEach((ing) => userIngredients.add(ing));
  renderIngredientChips();

  const span = document.createElement("div");
  span.innerHTML =
    "Detected: " +
    recognized.map((ing) => `<span class="tag">${ing}</span>`).join(" ");
  imageDetectResultEl.appendChild(span);
});

// ---------- MATCHING LOGIC ----------

function recipeMatchesDiet(recipe, dietPrefs) {
  if (dietPrefs.length === 0) return true;
  // recipe must include all selected diet tags
  return dietPrefs.every((tag) => recipe.dietTags.includes(tag));
}

function recipeMatchesFilters(recipe, difficulty, maxTime) {
  if (difficulty !== "any" && recipe.difficulty !== difficulty) return false;
  if (maxTime && recipe.cookingTime > maxTime) return false;
  return true;
}

function computeMatchScore(recipe, userIngsSet) {
  let score = 0;
  let matched = [];
  let missingCore = 0;
  let usedSubs = [];

  const userIngs = Array.from(userIngsSet);

  recipe.ingredients.forEach((ing) => {
    const nameNorm = normalizeIngredientName(ing.name);
    const directHit = userIngs.includes(nameNorm);
    if (directHit) {
      score += 3;
      matched.push(nameNorm);
      return;
    }

    // check substitutions
    const subs = SUBSTITUTIONS[nameNorm] || [];
    const subHit = subs.find((s) =>
      userIngs.includes(normalizeIngredientName(s))
    );
    if (subHit) {
      score += 2;
      usedSubs.push({ original: nameNorm, sub: subHit });
    }
  });

  // reward core ingredients
  (recipe.coreIngredients || []).forEach((core) => {
    if (userIngs.includes(core)) score += 3;
    else missingCore++;
  });

  // slight penalty for missing core
  score -= missingCore;

  return { score, matched, usedSubs };
}

function generateSubstitutionSuggestions(recipe, userIngsSet) {
  const suggestions = [];
  recipe.ingredients.forEach((ing) => {
    const nameNorm = normalizeIngredientName(ing.name);
    if (userIngsSet.has(nameNorm)) return;
    const subs = SUBSTITUTIONS[nameNorm];
    if (!subs || subs.length === 0) return;

    const availableSub = subs.find((s) =>
      userIngsSet.has(normalizeIngredientName(s))
    );
    if (availableSub) {
      suggestions.push(
        `You don't have "${nameNorm}", use "${availableSub}" instead.`
      );
    } else {
      suggestions.push(
        `If you don't have "${nameNorm}", possible substitutes: ${subs.join(
          ", "
        )}.`
      );
    }
  });
  return suggestions;
}

// ---------- RENDER RECIPES ----------

function renderRecipes(recipes, userIngsSet, targetServings) {
  recipesContainerEl.innerHTML = "";
  if (recipes.length === 0) {
    recipesContainerEl.innerHTML =
      '<p class="hint">No recipes matched. Try adding more ingredients or relaxing filters.</p>';
    return;
  }

  recipes.forEach((item) => {
    const { recipe, score, usedSubs } = item;
    const card = document.createElement("article");
    card.className = "recipe-card";

    const header = document.createElement("div");
    header.className = "recipe-header";
    header.innerHTML = `
          <div>
            <div class="recipe-title">${recipe.name}</div>
            <div class="match-score">Match score: ${score}</div>
          </div>
          <div class="recipe-tags">
            <span class="tag-pill">${recipe.cuisine}</span>
            <span class="tag-pill">${recipe.difficulty}</span>
            ${recipe.dietTags
              .map((t) => `<span class="tag-pill">${t}</span>`)
              .join("")}
          </div>
        `;
    card.appendChild(header);

    const meta = document.createElement("div");
    meta.className = "recipe-meta";
    meta.innerHTML = `
          <span class="meta-item">⏱ ${recipe.cookingTime} min</span>
          <span class="meta-item">🍽 Serves <strong>${
            targetServings || recipe.servings
          }</strong></span>
          <span class="meta-item">🔥 ${
            recipe.nutritionPerServing.calories
          } kcal/serving</span>
        `;
    card.appendChild(meta);

    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "recipe-ingredients";
    ingredientsSection.innerHTML = `<div class="recipe-section-title">Ingredients</div>`;
    const ul = document.createElement("ul");

    const factor =
      targetServings && targetServings > 0
        ? targetServings / recipe.servings
        : 1;

    recipe.ingredients.forEach((ing) => {
      const li = document.createElement("li");
      const scaledQty =
        typeof ing.quantity === "number"
          ? Math.round(ing.quantity * factor * 10) / 10
          : ing.quantity;

      const nameNorm = normalizeIngredientName(ing.name);
      const hasIng = userIngsSet.has(nameNorm);
      li.textContent = `${scaledQty}${ing.unit ? " " + ing.unit : ""} ${
        ing.name
      }`;
      if (hasIng) li.style.color = "#bbf7d0";
      ul.appendChild(li);
    });
    ingredientsSection.appendChild(ul);
    card.appendChild(ingredientsSection);

    const nutritionSection = document.createElement("div");
    nutritionSection.className = "recipe-nutrition";
    const n = recipe.nutritionPerServing;
    nutritionSection.innerHTML = `
          <div class="recipe-section-title">Nutrition (per serving)</div>
          <div>Calories: ${n.calories} kcal • Protein: ${n.protein} g • Carbs: ${n.carbs} g • Fat: ${n.fat} g</div>
        `;
    card.appendChild(nutritionSection);

    const stepsSection = document.createElement("div");
    stepsSection.className = "recipe-steps";
    stepsSection.innerHTML = `<div class="recipe-section-title">Steps</div>`;
    const ol = document.createElement("ol");
    recipe.instructions.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      ol.appendChild(li);
    });
    stepsSection.appendChild(ol);
    card.appendChild(stepsSection);

    const subsText = generateSubstitutionSuggestions(recipe, userIngsSet);
    if (subsText.length > 0) {
      const subsDiv = document.createElement("div");
      subsDiv.className = "substitutions";
      subsDiv.innerHTML =
        "<strong>Substitution tips:</strong> " + subsText.join(" ");
      card.appendChild(subsDiv);
    }

    // Rating + favorite
    const actions = document.createElement("div");
    actions.className = "recipe-actions";
    const ratingDiv = document.createElement("div");
    ratingDiv.className = "rating";
    const favBtn = document.createElement("button");
    favBtn.className = "favorite-btn";
    favBtn.innerHTML = "☆ Save";

    const currentRating = prefs.ratings[recipe.id] || 0;
    const isFav = prefs.favorites.includes(recipe.id);

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star" + (i <= currentRating ? " active" : "");
      star.textContent = "★";
      star.dataset.value = i;
      star.addEventListener("click", () => {
        prefs.ratings[recipe.id] = i;
        savePrefs(prefs);
        // re-render stars
        Array.from(ratingDiv.children).forEach((s, idx) => {
          s.classList.toggle("active", idx < i);
        });
        updateSuggestedSection();
      });
      ratingDiv.appendChild(star);
    }

    favBtn.classList.toggle("active", isFav);
    favBtn.innerHTML = isFav ? "★ Saved" : "☆ Save";
    favBtn.addEventListener("click", () => {
      const nowFav = prefs.favorites.includes(recipe.id);
      if (nowFav) {
        prefs.favorites = prefs.favorites.filter((id) => id !== recipe.id);
      } else {
        prefs.favorites.push(recipe.id);
      }
      savePrefs(prefs);
      favBtn.classList.toggle("active", !nowFav);
      favBtn.innerHTML = !nowFav ? "★ Saved" : "☆ Save";
      updateSuggestedSection();
    });

    actions.appendChild(ratingDiv);
    actions.appendChild(favBtn);
    card.appendChild(actions);

    recipesContainerEl.appendChild(card);
  });
}

// ---------- SUGGESTED SECTION ----------

function updateSuggestedSection() {
  suggestedContainerEl.innerHTML = "";
  const ratedIds = Object.keys(prefs.ratings).filter(
    (id) => prefs.ratings[id] >= 4
  );
  const favIds = prefs.favorites;

  const uniqueIds = [...new Set([...ratedIds, ...favIds])];

  if (uniqueIds.length === 0) {
    suggestedContainerEl.innerHTML =
      '<p class="hint">Rate or save recipes to see personalized suggestions here.</p>';
    return;
  }

  const suggested = RECIPES.filter((r) => uniqueIds.includes(r.id)).slice(0, 6);

  suggested.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.innerHTML = `
          <div class="recipe-title">${recipe.name}</div>
          <div class="recipe-meta">
            <span class="meta-item">${recipe.cuisine}</span>
            <span class="meta-item">⏱ ${recipe.cookingTime} min</span>
          </div>
        `;
    suggestedContainerEl.appendChild(card);
  });
}

// ---------- MAIN: FIND RECIPES CLICK ----------

document.getElementById("find-recipes-btn").addEventListener("click", () => {
  errorMsgEl.textContent = "";

  const dietPrefs = Array.from(
    document.querySelectorAll(".diet-check:checked")
  ).map((c) => c.value);

  const difficulty = document.getElementById("difficulty-select").value;
  const maxTimeRaw = document.getElementById("max-time-input").value.trim();
  const maxTime = maxTimeRaw ? Number(maxTimeRaw) : null;
  const targetServings = Number(
    document.getElementById("servings-input").value || 0
  );

  if (Number.isNaN(maxTime)) {
    errorMsgEl.textContent = "Max time must be a valid number.";
    return;
  }
  if (Number.isNaN(targetServings) || targetServings <= 0) {
    errorMsgEl.textContent = "Servings must be a positive number.";
    return;
  }

  if (userIngredients.size === 0) {
    errorMsgEl.textContent =
      "Please add at least one ingredient (or use image detection).";
    return;
  }

  // Matching
  const matches = [];
  RECIPES.forEach((recipe) => {
    if (!recipeMatchesDiet(recipe, dietPrefs)) return;
    if (!recipeMatchesFilters(recipe, difficulty, maxTime)) return;
    const { score, matched, usedSubs } = computeMatchScore(
      recipe,
      userIngredients
    );
    if (score <= 0) return; // ignore recipes with no overlap
    matches.push({ recipe, score, matched, usedSubs });
  });

  matches.sort(
    (a, b) => b.score - a.score || a.recipe.cookingTime - b.recipe.cookingTime
  );

  resultsCountEl.textContent = `${matches.length} found`;
  renderRecipes(matches, userIngredients, targetServings);
});

// Initial suggested section on load
updateSuggestedSection();
