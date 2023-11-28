import {data} from './data.js'

const result = Object.groupBy(data, ({ tvkNet }) => tvkNet)

const tvk = document.getElementById("root")

const buttonTVK = (item) => {
    return `<div class="tvk_item">
                <img class="info_img" src="./img/infoTVK.png" id="${item.id}"/>
                <a href="${item.link}" target="_blank">
                    <button class="button">
                        ${item.name}
                    </button>
                </a>
            </div>
    `;
}

const modalGeneration = (id) => {
    const tvk_info = data.find((item) => item.id == id)
    let lines = ``

    for (const [key , value] of Object.entries(tvk_info)) {
        console.log(`${key}: ${value}`)
        lines += `<p> | ${value}</p>`
    }

    var modal_html = `<div id="infoModal" class="modal">
        <div class="modal-content">
            <span class="close" id="close" onclick="this.parentElement.parentElement.style.display='none' ">&times;</span>
                ${lines}
            </div>
        </div>`
    tvk.insertAdjacentHTML("beforeend", modal_html)
}

for (const tvkNetNumber in result) {
    let html_item = ``;
    for (const item of result[tvkNetNumber]) {
        html_item += buttonTVK(item)
    }
  
    tvk.insertAdjacentHTML(
      "beforeend",
      `<div id="${tvkNetNumber}" class="tvk_net">
        <div class="tvk_title">${tvkNetNumber}</div>
        <div class="background_form">
        ${html_item}
      </div>
    </div>`
    );
}

var info_buttons = document.getElementsByClassName("info_img")

for (let i = 0; i < info_buttons.length; i++) {
    info_buttons[i].addEventListener("click", (e) => {
        e.preventDefault()
        modalGeneration(info_buttons[i].id)
    })
}