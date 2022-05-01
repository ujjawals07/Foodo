"use strict";
// nav event listners
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

//menu login search active
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
  favcontainer.classList.remove("fav-active");
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
    favcontainer.classList.remove("fav-active");
  });
});
//login section
let loginicon = document.querySelector("#cart-user");
let loginform = document.querySelector(".login-form-container");
loginicon.addEventListener("click", function () {
  loginform.classList.add("login-form-container-active");
  favcontainer.classList.remove("fav-active");
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

let favicon = document.querySelector("#fav-icon");
let favcontainer = document.querySelector(".fav-result");
favicon.addEventListener("click", function () {
  favcontainer.classList.add("fav-active");
  searchformdisplay.classList.remove("search-form-container-active");
  containers.classList.add("containers-deactiveate");
  loginform.classList.remove("login-form-container-active");
});

let logoimg = document.querySelector("#logo-img");
logoimg.addEventListener("click", function () {
  favcontainer.classList.remove("fav-active");
  searchformdisplay.classList.remove("search-form-container-active");
  containers.classList.remove("containers-deactiveate");
  loginform.classList.remove("login-form-container-active");
  home.classList.remove("home-deactive");
});

//about picture effect
document.querySelector(".about").onmousemove = (e) => {
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;

  document.querySelector(
    ".about .about-parallax-img"
  ).style.transform = `translateX(${y}px) translateY(${x}px)`;
};

document.querySelector(".home").onmouseleave = () => {
  document.querySelector(
    ".home .home-parallax-img"
  ).style.transform = `translateX(0px) translateY(0px)`;
};
let homebtn = document.querySelector("#home-btn");

homebtn.addEventListener("click", function () {
  home.classList.remove("home-deactive");
});

const searchBtn = document.querySelector(".i2");
const searchmealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners

searchmealList.addEventListener("click", getMealRecipe);
searchBtn.addEventListener("click", getMealList);
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
          <h2 class="title">Your Search Results:</h2>
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class="fas fa-heart heart h"></div>
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food" class="meal-pic">
                        </div>
                        <div class = "meal-name">
                            <h3 class="meal-result-h">${meal.strMeal}</h3>
                          
                        </div>
                        <a  class = "recipe-btn search-recipe-btn">Get Recipe</a>
                     
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
    let mealItem = e.target.parentElement;
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
          <div class="fas fa-heart heart h"></div>
          <div class = "best-img">
             <img src = "${meal.strMealThumb}" alt = "food" class="best-pic">
           </div>
           <div class = "best-name">
             <h3 class="best-result-h">${meal.strMeal}</h3>
           
           </div>
           <a  class = "recipe-btn view-recipe search-recipe-btn">view Recipe</a>
         
         </div>
                `;
        }
        bestmealcontainer.classList.remove("notFound");
      }

      bestmealcontainer.innerHTML = htmli;
    });
}
setMealList();

let popularmealcontainer = document.querySelector(".popular-meal-container");
let popularmealid = document.getElementById("popular-meals");
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
          <div class="fas fa-heart heart h"></div>
          <div class = "popular-img">
             <img src = "${meal.strMealThumb}" alt = "food" class="best-pic">
           </div>
           <div class = "popular-name">
             <h3 class="popular-result-h">${meal.strMeal}</h3>
           
           </div>
           <a  class = "l recipe-btn view-recipe search-recipe-btn">view Recipe</a>
          
         </div>
                `;
        }
        popularmealcontainer.classList.remove("notFound");
      }

      popularmealcontainer.innerHTML = htmli;
    });
}
popularMealList();

//loging local storage and signup  local storage functions

function signup() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("create-email").value;
  let pass = document.getElementById("create-password").value;
  let confirmpass = document.getElementById("create-password-confirm").value;
  localStorage.setItem("email1", email);
  let username = localStorage.setItem("name1", name);
  let userpass = localStorage.setItem("pass1", pass);
  localStorage.setItem("confirmpass1", confirmpass);
}

const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const forms = document.querySelector("#formtwo");
const errorElement = document.getElementById("error");
const si = document.querySelector(".create-btn");
const usern = document.querySelector(".user-n");
const email = document.querySelector(".email");
function validation(e) {
  let msg = [];
  if (
    p1.value == p2.value &&
    p1.value.length >= 6 &&
    p1.value.length <= 10 &&
    usern.value.length >= 3 &&
    usern.value.length <= 10
  ) {
    signup();

    signupform.classList.remove("form2-active");
    formlogin.classList.remove("hidden");
  } else {
    msg.push(
      "your password  must be between 6 to 10 charaters and username must be between 3 to 10 charataters"
    );
  }

  if (msg.length > 0) {
    e.preventDefault();
    errorElement.innerText = msg.join(", ");
  }
}
si.addEventListener("click", validation);
function login() {
  let loginuser = document.getElementById("login-username").value;
  let loginpass = document.getElementById("password").value;

  let user1 = localStorage.getItem("name1");
  let pass1 = localStorage.getItem("pass1");

  if (user1 == loginuser && pass1 == loginpass && loginuser != "") {
    alert("log in  succesfullied");
    loginform.classList.remove("login-form-container-active");
    containers.classList.remove("containers-deactiveate");
    bestmealfav.addEventListener("click", addtofavbtn);
    popularmealfav.addEventListener("click", addtofavbtn);
    searchmealfav.addEventListener("click", addtofavbtn);
  } else {
    alert("wrong password or an email");
  }
}

let loginbtn = document.querySelector("#login-btn");

let logo = loginbtn.addEventListener("click", function () {
  login();
});
//message of header for login
const message = document.createElement("div");
message.classList.add("message");
message.innerHTML = `IF you  are logged in then you can add recipes in favorite. <button class="got got-remove">Got It </button>`;
home.prepend(message);

document.querySelector(".got-remove").addEventListener("click", function () {
  message.remove();
});

//add to fav
let bestmealfav = document.querySelector(".bestmealsfav");
let popularmealfav = document.querySelector(".popularmealsfav");
let searchmealfav = document.querySelector(".searchmealfav");
function addtofavbtn(e) {
  e.preventDefault();
  if (e.target.classList.contains("h")) {
    let mealItem = e.target.parentElement;
    console.log(mealItem);
    let mealname = mealItem.children[2].innerText;
    let mealimg = mealItem.children[1].children[0].src;
    add(mealname, mealimg);
  }
}
function add(mealname, mealimg) {
  let favbox = document.createElement("div");
  favbox.classList.add("fav-item");
  let favcontainerbox =
    document.getElementsByClassName("fav-meal-container")[0];
  let favname = favcontainerbox.getElementsByClassName("fav-result-h");
  for (let i = 0; i < favname.length; i++) {
    if (favname[i].innerText == mealname) {
      alert("alredy added");
      return;
    }
  }
  let favinnerhtml = `
<div class="fav-img">
<img src="${mealimg}" alt="food" class="fav-pic" />
</div>
<div class="fav-name">
<h3 class="fav-result-h">${mealname}</h3>

<button class="view-recipe search-recipe-btn">view Recipe</button>
<button class="remove-recipe remove-recipe-btn">remove</button>
</div>

 `;
  favbox.innerHTML = favinnerhtml;
  favcontainerbox.append(favbox);
  favbox
    .getElementsByClassName("remove-recipe")[0]
    .addEventListener("click", function (event) {
      let remove = event.target;
      remove.parentElement.parentElement.remove();
    });
}
