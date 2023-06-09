async function setStarted() {
    const isStarted = await getData('id')
    console.log(isStarted)
    document.getElementById('start').checked = isStarted    
}
setStarted()

function start(e) {
    let location = '/start'
    if(!e.target.checked) {
        location = '/stopp'
    }
    window.location.href = location
}

async function getData(data) {
    return fetch(`/data?d=${data}`)
        .then(response => response.json())
        .catch(error => { console.log(error) })
}

async function setSettings() {
    const settings = await getData('settings')
    document.querySelectorAll(".settingsInput").forEach(input => {
        input.value = settings[input.name]
    })
}

async function setCameras() {
    const alarms = await getData('alarms')
    const cameras = await getData('cameras')

    for (let i = 0; i < cameras.length; i++) {
        const row = document.createElement("tr")
        let alarmsString = []
        cameras[i].alarms.forEach(alarmId => {
            const alarm = alarms.find(a => a.id == alarmId)
            alarmsString.push(alarm.name)
        })
        row.innerHTML =
            `
            <th>${i + 1}</th>
            <td>${cameras[i].name}</td>
            <td>${cameras[i].ip}</td>
            <td>${alarmsString.join(', ')}</td>
            <td><a href='/deleteCamera?id=${i}'><button class='btn btn-danger'><i class="bi bi-trash3"></i></button></a></td>
        `
        document.getElementById("tableBody").appendChild(row)
    }
}

async function setAlarms() {
    const devices = await getData('devices')
    const alarms = await getData('alarms')

    const tableBody = document.getElementById("tableBody")
    for (let i = 0; i < alarms.length; i++) {
        const row = document.createElement("tr")
        let devicesString = []
        alarms[i].devices.forEach(device => {
            const dev = devices.find(d => d.id == device)
            devicesString.push(`<span title='${dev.ip}'>${dev.name}</span>`)
        })
        row.innerHTML =
            `
        <th>${i + 1}</th>
        <td>${alarms[i].name}</td>
        <td>${alarms[i].email ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-x-lg"></i>'}</td>
        <td>${alarms[i].sms ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-x-lg"></i>'}</td>
        <td>${devicesString.join(', ')}</td>
        <td><a href='/deleteAlarm?id=${i}'><button class='btn btn-danger'><i class="bi bi-trash3"></i></button></a></td>
        `
        tableBody.appendChild(row)
    }
}

async function setDevices() {
    const devices = await getData('devices')
    for (let i = 0; i < devices.length; i++) {
        const row = document.createElement("tr")
        row.innerHTML =
            `
            <th>${i + 1}</th>
            <td>${devices[i].name}</td>
            <td>${devices[i].ip}</td>
            <td>${devices[i].delay}</td>
            <td><a href='/deleteDevice?id=${i}'><button class='btn btn-danger'><i class="bi bi-trash3"></i></button></a></td>
        `
        document.getElementById("tableBody").appendChild(row)
    }
}

async function setAddCamera() {
    const alarms = await getData('alarms')
    let options = ""
    alarms.forEach(alarm => {
        options += `<option value='${alarm.id}'>${alarm.name}</option>`
    })
    document.getElementById('alarms').innerHTML = options
}

async function setAddAlarm() {
    const devices = await getData('devices')
    let options = ""
    devices.forEach(device => {
        options += `<option value='${device.id}'>${device.name}</option>`
    })
    document.getElementById('devices').innerHTML = options
}