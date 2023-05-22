import "./assets/styles/style.css";
import { getAddress, validateIPAddress, createMap } from "./helpers";
import "leaflet/dist/leaflet.css";
import icon from "./assets/images/icon-location.svg";

const searchInput = document.querySelector(".finder__input");
const searchBtn = document.querySelector(".finder__btn");

const address = document.getElementById("address");
const location = document.getElementById("location");
const time = document.getElementById("time");
const isp = document.getElementById("isp");
const mapArea = document.querySelector(".map");

searchInput.addEventListener("keydown", handlerKey);
searchBtn.addEventListener("click", handlerQuery);
document.addEventListener("DOMContentLoaded", pageLoaded);

const map = L.map(mapArea, {
  center: [37.38605, -122.08385],
  zoom: 13,
});

createMap(map);

const mapIcon = L.icon({
  iconUrl: icon,
  iconSize: [46, 56],
});

L.marker([37.38605, -122.08385], { icon: mapIcon }).addTo(map);

function handlerKey(event) {
  if (event.key === "Enter") {
    handlerQuery();
  }
}

function pageLoaded() {
  getAddress().then(setInfo);
}

function handlerQuery() {
  if (validateIPAddress(searchInput.value)) {
    getAddress(searchInput.value).then(setInfo);
  } else {
    alert("Не правильно!");
    searchInput.value = "";
    getAddress().then(setInfo);
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;

  address.innerText = mapData.ip;
  location.innerText = region + " " + country;
  time.innerText = timezone;
  isp.innerText = mapData.isp;

  console.log([lat, lng]);
  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: mapIcon }).addTo(map);
}
