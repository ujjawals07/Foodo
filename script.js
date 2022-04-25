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

let searchicon = document.querySelector("#search-bar-icon");
let searchformdisplay = document.querySelector(".search-form-container");
searchicon.addEventListener("click", function () {
  searchformdisplay.classList.toggle("search-form-container-active");
  favbody.classList.remove("fav-active");
  loginform.classList.remove("login-form-container-active");
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
