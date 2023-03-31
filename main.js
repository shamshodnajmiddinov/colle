import axios from "axios"

export let baseURL = "http://localhost:3000"

function reDATA() {
    axios.get("http://localhost:3000/users")
        .then((res) => reload(res.data))
}
reDATA()
let ul = document.querySelector('#ul')
let form = document.forms.footer_content
let allbtn = document.querySelectorAll(".btn")
let btnMajor = document.querySelector(".major")
let newUser = document.querySelector(".new_user")
let newPrice = document.querySelector(".new_price")
let search = document.querySelector(".search")
let ID;
let IDinp;
let Item;


export function reload(arr) {
    ul.innerHTML = ""
    for (let item of arr) {
        let li = document.createElement("li")
        let spamName = document.createElement("span")
        let inpPrice = document.createElement("input")
        let active_btn = document.createElement("div")
        let btn_cookie = document.createElement("button")
        let btn_trash = document.createElement("button")
        let cookie = document.createElement("img")
        let trash = document.createElement("img")

        li.classList.add("sd")

        spamName.innerHTML = item.name
        inpPrice.value = item.salary

        cookie.src = "/icon/cookie.svg"
        trash.src = "/icon/delete.svg"

        cookie.classList.add("cookie")
        trash.classList.add("trash")

        active_btn.classList.add("active_btn")
        btn_cookie.classList.add("btn_cookie")
        btn_trash.classList.add("btn_trash")

        btn_cookie.append(cookie)
        btn_trash.append(trash)
        active_btn.append(btn_cookie, btn_trash)
        li.append(spamName, inpPrice, active_btn)
        ul.append(li)

        // trash.onclick = () => {
        //     axios.delete("http://localhost:3000/users?id=" + item.id)
        //         .then((res) => console.log(res))
        // }

        cookie.onclick = () => {
            ID = item.id
            reCokie(spamName, inpPrice)
        }
        inpPrice.onclick = () => {
            IDinp = item.id
            reinp(inpPrice)
            console.log(inpPrice.value);
        }
        trash.onclick = () => {
            fetch(baseURL + "/users/" + item.id, {
                method: "DELETE"
            }).then((res) => li.style.display = "none")
        };


        // if (item.salary > 1000) {
        //     axios.post(baseURL + "/majors/", item)
        //         .then(res => reDATA())
        // }
    }
}

let isnot
isnot = !isnot

function reCokie(name, prices) {
    fetch(baseURL + "/users/" + ID, {
        method: 'PATCH',
        body: JSON.stringify({
            type: isnot,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.type === true) {
                name.classList.add('span_active')
                prices.classList.add('span_active')

            }
        });
}
function reinp(name) {
    fetch(baseURL + "/users/" + IDinp, {
        method: 'PATCH',
        body: JSON.stringify({
            salary: name.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => { console.log(json); });
}


form.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        id: new Date(),
        name: newUser.value,
        salary: newPrice.value
    }
    let {
        id,
        name,
        salary
    } = user
    if (id && name && salary) {
        axios.post(baseURL + "/users/", user)
            .then(res => reDATA())
    }
}





