import Axios from 'axios';

export const api = Axios.create
    ({
        baseURL: "http://localhost:5000/api",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + localStorage.getItem("usuario-valler")
        }
    });

export const apiOfertaPut = Axios.create
    ({
        baseURL: "http://localhost:5000/api",
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("usuario-valler")
        }
    });