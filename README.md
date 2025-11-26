# 🍳 Smart Recipe Generator

A frontend-web application that suggests recipes based on the ingredients you currently have. This project focuses on reducing food waste by helping users cook with what is available in their pantry, featuring dietary filters, smart ingredient matching, and a simulated image recognition feature.

## ✨ Features

* **Ingredient-Based Search:** Input ingredients manually or select from quick-add tags.
* **Smart Matching Algorithm:**
    * Calculates a "Match Score" for every recipe.
    * Prioritizes core ingredients.
    * Suggests substitutions (e.g., if you lack milk, it suggests soy milk).
* **Simulated Image Recognition:** Upload an image file (e.g., `tomato.jpg`), and the app detects the ingredient based on the filename (Demo feature).
* **Advanced Filtering:** Filter by Dietary Preferences (Vegan, Gluten-free), Difficulty, and Cooking Time.
* **Dynamic Recipe Cards:** Displays cooking steps, nutrition info per serving, and highlights missing ingredients.
* **Local Storage:** Saves your **Ratings** and **Favorite Recipes** locally in your browser.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Custom styling using CSS Grid and Flexbox (No external frameworks).
* **JavaScript (ES6+):** DOM manipulation, logic algorithm, and local storage management.
* **Data:** Recipes are stored in a structured JSON array within the application.

## 🚀 How to Run

1.  **Clone or Download** this repository.
2.  Locate the `index.html` file.
3.  **Double-click** `index.html` to open it in your default web browser.
    * *Note:* No backend server or Node.js installation is required.

## 📂 Project Structure

```text
/smart-recipe-generator
│
├── index.html      # Main application file (Structure + Logic + Styles)
├── README.md       # Project documentation
└── (assets/)       # (Optional) Folder for images/icons