// data
var zones = new Set(data.result.records.map(x => x.Zone));
zones = Array.from(zones);
// DOM
var distinct_select = document.getElementById('distinct-select');

// Register Event
distinct_select.addEventListener('change', updateContent);

// View
initialSelect();

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

function updateContent(e) {

}