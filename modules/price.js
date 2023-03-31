import axios from "axios";
import { reload } from "../main";
import { baseURL } from "../main";


axios.get('http://localhost:3000/majors')
    .then(res => reload(res.data))


// fetch(baseURL + "/majors/", {
//     method: "GET"
// }).then((res) => console.log(res))