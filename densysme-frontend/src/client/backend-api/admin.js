import axios from 'axios'

const ENDPOINT = "http://localhost:8000";

export const UserApi = {
    login: async (username, password) => {
        let data = {"username": username, "password": password}
        const res = await axios({
            method: "post",
            url: ENDPOINT + "/log-admin",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
        return res
    },
    getProfile: async () => {
        const res = await axios.get(ENDPOINT + "/admin-page").then((r)=>{
            console.log(r.data);
            console.log("GET PROFILE");
            return r.data
        })
        return res
    },
    logout: async () => {
        const res = await axios.post(ENDPOINT + "/logout-admin").then(r =>{
            return r.status;
        })
        return res
    },
}

// module.exports = { UserApi }