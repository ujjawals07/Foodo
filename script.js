"use strict";
const about = document.querySelector("#about");
const aboutsection = document.querySelector(".about");

about.addEventListener("click", function () {
  aboutsection.scrollIntoView({ behavior: "smooth" });
});

const popularnavbtn = document.querySelector("#popular-meal");
const popularsection = document.querySelector("#popular-section");

popularnavbtn.addEventListener("click", function () {
  popularsection.scrollIntoView({ behavior: "smooth" });
});


const bestnavbtn = document.querySelector("#best-chicken");
const bestsection = document.querySelector("#best");

bestnavbtn.addEventListener("click", function () {
  bestsection.scrollIntoView({ behavior: "smooth" });
});


const blogbtn = document.querySelector("#blog");
const blogsection = document.querySelector("#blogs");

blogbtn.addEventListener("click", function () {
  blogsection.scrollIntoView({ behavior: "smooth" });
});

const reviewbtn = document.querySelector("#review");
const reviewsection = document.querySelector("#section-review");

reviewbtn.addEventListener("click", function () {
  reviewsection.scrollIntoView({ behavior: "smooth" });
});
let menu = document.querySelector("#menu");
let navlist = document.querySelector(".nav_list");
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navlist.classList.toggle("active");
};
window.onscroll = () => {
  menu.classList.remove("fa-times");
  navlist.classList.remove("active");
};
let containers = document.querySelector(".containers");
let home = document.querySelector(".home"); //home-section
let searchicon = document.querySelector("#search-bar-icon");
let searchformdisplay = document.querySelector(".search-form-container");
searchicon.addEventListener("click", function () {
  searchformdisplay.classList.add("search-form-container-active");

  loginform.classList.remove("login-form-container-active");
  home.classList.add("home-deactive");
  containers.classList.add("containers-deactiveate");
});

let navitems = document.querySelectorAll(".nav-items");
navitems.forEach(function (n) {
  n.addEventListener("click", function () {
    searchformdisplay.classList.remove("search-form-container-active");
    loginform.classList.remove("login-form-container-active");
    containers.classList.remove("containers-deactiveate");
  });
});

let loginicon = document.querySelector("#cart-user");
let loginform = document.querySelector(".login-form-container");
loginicon.addEventListener("click", function () {
  loginform.classList.add("login-form-container-active");

  searchformdisplay.classList.remove("search-form-container-active");
  containers.classList.add("containers-deactiveate");
});
let formlogin = document.querySelector(".form-login");
let signupform = document.querySelector(".form2");
let createaccount = document.querySelector("#create");
createaccount.addEventListener("click", function () {
  signupform.classList.add("form2-active");
  formlogin.classList.add("hidden");
});
let backtologin = document.querySelector("#create-a");
backtologin.addEventListener("click", function () {
  signupform.classList.remove("form2-active");
  formlogin.classList.remove("hidden");
});
document.querySelector(".home").onmousemove = (e) => {
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;

  document.querySelector(
    ".home .home-parallax-img"
  ).style.transform = `translateX(${y}px) translateY(${x}px)`;
};

document.querySelector(".home").onmouseleave = () => {
  document.querySelector(
    ".home .home-parallax-img"
  ).style.transform = `translateX(0px) translateY(0px)`;
};
let homebtn = document.querySelector("#home-btn");

homebtn.addEventListener("click", function () {
  console.log("v");
  home.classList.remove("home-deactive");
});

const searchBtn = document.querySelector(".i2");
const searchmealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
searchmealList.addEventListener("click", getMealRecipe);

recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-box").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food" class="meal-pic">
                        </div>
                        <div class = "meal-name">
                            <h3 class="meal-result-h">${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn search-recipe-btn">Get Recipe</a>
                        </div>
                    
                    </div>
                `;
        });
        searchmealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        searchmealList.classList.add("notFound");
      }

      searchmealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

let bestmealcontainer = document.querySelector(".best-meal-container");
let bestmealid = document.querySelector("#best-meal");
bestmealid.addEventListener("click", getMealRecipe);
function setMealList() {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
    .then((response) => response.json())
    .then((data) => {
      let htmli = "";
      if (data.meals) {
        for (let index = 0; index < data.meals.length; index++) {
          let meal = data.meals[index];
          console.log(meal);
          htmli += `
        
          <div class = "best-item" data-id = "${meal.idMeal}">
          <div class = "best-img">
             <img src = "${meal.strMealThumb}" alt = "food" class="best-pic">
           </div>
           <div class = "best-name">
             <h3 class="best-result-h">${meal.strMeal}</h3>
             <a href = "#" class = "recipe-btn view-recipe search-recipe-btn">view Recipe</a>
           </div>
        
         </div>
                `;
        }
        bestmealcontainer.classList.remove("notFound");
      } else {
        htmli = "Sorry, we didn't find any meal!";
        bestmealcontainer.classList.add("notFound");
      }

      bestmealcontainer.innerHTML = htmli;
    });
}
setMealList();

let popularmealcontainer = document.querySelector(".popular-meal-container");
let popularmealid = document.getElementById("popular-meal");
popularmealid.addEventListener("click", getMealRecipe);
function popularMealList() {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`)
    .then((response) => response.json())
    .then((data) => {
      let htmli = "";
      if (data.meals) {
        for (let index = 11; index < data.meals.length; index++) {
          let meal = data.meals[index];
          console.log(meal);
          htmli += `
        
          <div class = "popular-item" data-id = "${meal.idMeal}">
          <div class = "popular-img">
             <img src = "${meal.strMealThumb}" alt = "food" class="best-pic">
           </div>
           <div class = "popular-name">
             <h3 class="popular-result-h">${meal.strMeal}</h3>
             <a href = "#" class = "recipe-btn view-recipe search-recipe-btn">view Recipe</a>
           </div>
        
         </div>
                `;
        }
        popularmealcontainer.classList.remove("notFound");
      }

      popularmealcontainer.innerHTML = htmli;
    });
}
popularMealList();
