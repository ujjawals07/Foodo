"use strict";
const search = async function () {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`
  );
  console.log(res);
  const data = res.json();
  console.log(data);
};
search();
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

let home = document.querySelector(".home"); //home-section
let searchicon = document.querySelector("#search-bar-icon");
let searchformdisplay = document.querySelector(".search-form-container");
searchicon.addEventListener("click", function () {
  searchformdisplay.classList.add("search-form-container-active");
  favbody.classList.remove("fav-active");
  loginform.classList.remove("login-form-container-active");
  home.classList.add("home-deactive");

});
let favicon = document.querySelector("#fav-icon");
let favbody = document.querySelector(".fav-body");
favicon.addEventListener("click", function () {
  favbody.classList.toggle("fav-active");
  searchformdisplay.classList.remove("search-form-container-active");
  loginform.classList.remove("login-form-container-active");
});
let navitems = document.querySelectorAll(".nav-items");
navitems.forEach(function (n) {
  n.addEventListener("click", function () {
    favbody.classList.remove("fav-active");
    searchformdisplay.classList.remove("search-form-container-active");
    loginform.classList.remove("login-form-container-active");
  });
});

let loginicon = document.querySelector("#cart-user");
let loginform = document.querySelector(".login-form-container");
loginicon.addEventListener("click", function () {
  loginform.classList.toggle("login-form-container-active");
  favbody.classList.remove("fav-active");
  searchformdisplay.classList.remove("search-form-container-active");
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
                        <div class="fas fa-heart heart"></div>
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
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
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
/*   <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>*/
