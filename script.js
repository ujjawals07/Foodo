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
});
