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

const getURL = (urlOptions) => {
  let url = Object.keys(urlOptions).reduce((url, option) => {
    if (urlOptions[option]) {
      url += `${option}=${urlOptions[option]}&`;
    }
    return url;
  }, `https://pixabay.com/api/?key=${API_KEY}&`);
  return url;
};

const getAllData = async () => {
  let url = getURL(urlOptions);

  const response = await fetch(url);
  const data = await response.json();
  console.log(data.hits);

  newList = [...newList, ...data.hits];

  renderImage(newList);
};

const renderImage = (newList) => {
  const newListHTML = newList
    .map((item) => {
      return `
      <div class="col">
      <div class="card">
      <img src="${item.webformatURL}" class="card-img-top" alt="..." />
        <div class="card-body">
        </div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("card-list").innerHTML = newListHTML;
};

const handleClickMenu = (category) => {
  putActiveClass(category);
};

const handleSearchClick = () => {
  let query = document.getElementById("search-input").value;
  urlOptions.q = query;

  getAllData();
};

getAllData();
