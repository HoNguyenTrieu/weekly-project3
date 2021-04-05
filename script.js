var API_KEY = "20900592-28c2716e6df3e7b29e5099b42";
var URL =
  "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent("");

// console.log(URL);
let newList = [];

const urlOptions = {
  lang: "en",
  page: 1,
  q: "",
};

let currentSideMenu = "photos";

// add "active" class when client click
const putActiveClass = (category) => {
  document.getElementById(currentSideMenu).classList.remove("active");
  document.getElementById(category).classList.add("active");
  currentSideMenu = category;
};

// this function will make string url
const getURL = (urlOptions) => {
  let url = Object.keys(urlOptions).reduce((url, option) => {
    if (urlOptions[option]) {
      url += `${option}=${urlOptions[option]}&`;
    }
    return url;
  }, `https://pixabay.com/api/?key=${API_KEY}&`);
  return url;
};

// This function will get data and convert this to json type => So we can use method to work with data json
const getAllData = async () => {
  let url = getURL(urlOptions);

  document.getElementById("card-list").innerHTML = `
  <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.hits);

  newList = [...data.hits, ...newList];

  renderImage(newList);
};

// function render Image
const renderImage = (newList) => {
  const newListHTML = newList
    .map((item) => {
      return `
      <div class="col">
      
      <img src="${item.webformatURL}" class="card-img-top" alt="..." />
      <div class="overlay">
      <div class="text">${item.user}</div>
      </div>
      </div>`;
    })
    .join("");

  document.getElementById("card-list").innerHTML = newListHTML;
};

// change status active when client click. And will put value to search input
const handleClickMenu = (category) => {
  putActiveClass(category);
  console.log(category);
  let query = category;
  console.log(query);
  urlOptions.q = query;
  getAllData();
};

// get result by loadmore button
const handleLoadMoreClick = () => {
  urlOptions.page += 1;
  getAllData();
};

// get image form search
const handleSearchClick = () => {
  let query = document.getElementById("search-input").value;
  urlOptions.q = query;

  getAllData();
};

getAllData();
