// data
var zones = new Set(data.result.records.map(x => x.Zone));
zones = Array.from(zones);
// DOM
var distinct_select = document.getElementById('distinct-select');
var hot_distinct_list = document.getElementById('hot-district-list');

// Register Event
distinct_select.addEventListener('change', onZoneChanged);
hot_distinct_list.addEventListener('click', onHotDistinctListClick);

// View
initialSelect();



function onZoneChanged(e) {
    let spots = getZoneSpotData(e.target.value);
    updateSpots(spots, e.target.value);
}

function onHotDistinctListClick(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'LI') {
        return;
    }
    let spots = getZoneSpotData(e.target.textContent);
    updateSpots(spots, e.target.textContent);
}

function getZoneSpotData(zone) {
    let spots = data.result.records.filter(x => x.Zone == zone);
    return spots;
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

function updateSpots(spots, zoneName) {
    let header = document.querySelector('.content-header');
    header.textContent = zoneName;

    let zone_list = document.querySelector('.zone-list');
    zone_list.innerHTML = '';
    for (let i = 0; i < spots.length; i++) {
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