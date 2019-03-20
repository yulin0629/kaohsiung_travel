// data
var zones = new Set(data.result.records.map(x => x.Zone));
zones = Array.from(zones);
const SPOTS_SHOW_PER_ZONE = 5;
let currentSpots = [];
let currentPage = 0;
// DOM
var distinct_select = document.querySelector('.distinct-select');
var hot_distinct_list = document.getElementById('hot-district-list');
var page_list = document.querySelector('.page-list');
var page_prev = document.querySelector('.page-prev');
var page_next = document.querySelector('.page-next');

// Register Event
distinct_select.addEventListener('change', onZoneChanged);
hot_distinct_list.addEventListener('click', onHotDistinctListClick);
page_list.addEventListener('click', onPageListClick);
page_prev.addEventListener('click', onPagePrevClick);
page_next.addEventListener('click', onPageNextClick);

// View
initialSelect();
getZoneSpotData('苓雅區');
updateHeader('苓雅區');
updateContent();



function onZoneChanged(e) {
    currentPage = 0;
    getZoneSpotData(e.target.value);
    updateHeader(e.target.value);
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, SPOTS_SHOW_PER_ZONE);
    updatePageList();
}

function onHotDistinctListClick(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'LI') {
        return;
    }
    currentPage = 0;
    getZoneSpotData(e.target.textContent);
    updateHeader(e.target.textContent);
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, SPOTS_SHOW_PER_ZONE);
    updatePageList();
}

function onPageListClick(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'A') {
        return;
    }
    e.preventDefault();
    currentPage = parseInt(e.target.dataset.index);
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, start + SPOTS_SHOW_PER_ZONE);
    updatePageList();
}

function onPagePrevClick(e) {
    e.preventDefault();
    currentPage -= 1;
    console.log(currentPage);
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, start + SPOTS_SHOW_PER_ZONE);
    updatePageList();
}

function onPageNextClick(e) {
    e.preventDefault();
    currentPage += 1;
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, start + SPOTS_SHOW_PER_ZONE);
    updatePageList();
}



function getZoneSpotData(zone, start = 0, end = 10) {
    let spots = data.result.records.filter(x => x.Zone == zone);
    currentSpots = spots;
}

function initialSelect() {
    var length = zones.length;
    for (let i = 0; i < length; i++) {
        const zone = zones[i];
        let option = document.createElement('option');
        option.textContent = zone;
        option.setAttribute('value', zone);
        distinct_select.appendChild(option);
    }
}

function updateContent() {
    let start = currentPage * SPOTS_SHOW_PER_ZONE;
    updateSpots(start, SPOTS_SHOW_PER_ZONE);
    updatePageList();
}

function updateHeader(zoneName) {
    let header = document.querySelector('.content-header');
    header.textContent = zoneName;
}

function updateSpots(start = 0, end = Infinity) {
    spots = currentSpots
    let zone_list = document.querySelector('.zone-list');
    zone_list.innerHTML = '';

    for (let i = start; i < spots.length && i < end; i++) {
        const zoneData = spots[i];
        zone_list.innerHTML += `<li>
        <div class="spot-img">
            <img src="${zoneData.Picture1}" alt="${zoneData.Name}">
            <h3 class="name">
                ${zoneData.Name}
            </h3>
            <h4 class="zone">${zoneData.Zone}</h4>
        </div>
        <ul class="spot-information">
            <li class="open-hour">
                <div class="icon">
                    <img src="images/icons_clock.png" alt="icon clock">
                </div>
                <p> ${zoneData.Opentime}</p>
            </li>
            <li>
                <div class="icon">
                    <img src="images/icons_pin.png" alt="icon pin">
                </div>
                <address class="location">${zoneData.Add}</address>
            </li>
            <li>
                <div class="icon">
                    <img src="images/icons_phone.png" alt="icon phone">
                </div>
                <p class="phone-number" href="tel:">886-7-2363357</p>
            </li>
        </ul>
        <div class="spot-tag"><img class="icon" src="images/icons_tag.png" alt="icon tag">${zoneData.Ticketinfo}</div>
        </li>`;
    }
}

function updatePageList() {
    let list = document.querySelector('.page-list');
    list.innerHTML = '';
    let length = Math.ceil(currentSpots.length / SPOTS_SHOW_PER_ZONE);
    for (let i = 0; i < length; i++) {
        let active = i === currentPage ? 'active' : '';
        list.innerHTML += `<a class="${active}" data-index="${i}" href="">${i + 1}</a>`
    }

    if (currentPage <= 0) {
        page_prev.classList.add('disabled');
        page_prev.href
    } else {
        page_prev.classList.remove('disabled');
    }

    if (currentPage >= length - 1) {
        page_next.classList.add('disabled');
    } else {
        page_next.classList.remove('disabled');
    }
}