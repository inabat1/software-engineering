import axios from "axios";

const ENDPOINT = "http://localhost:8000";

export const DoctorApi = {
    getAllDoctors: async () =>{
        const res = await axios.get(ENDPOINT + "/api/doctors").then((r)=>{
            //console.log(res.data);
            return r.data;
        })
        return res;
    },

    getDoctorById: async (doctorId) => {
        const res = await axios.get(ENDPOINT + '/api/doctors/' + doctorId).then((r) => {
            return r.data
        })
        return res
    },

    addDoctor: async (data) => {
        const res = await axios({
            method: "post",
            url: ENDPOINT + "/api/register-doctor",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
        return res
    },

    editDoctorById: async (doctorId, data) => {
        console.log(data);
        const res = await axios({
            method: "put",
            url: ENDPOINT + '/api/doctors/' + doctorId,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json"},
        })
        
        return res
    },

    deleteDoctor: async (doctorId) => {
        const res = await axios.delete(ENDPOINT + `/api/doctors/${doctorId}`).then((r)=>{
            return r.status
        })
        return res
    },
    // idk might need a debug
    getDocByNameSpec: async (input) =>{
        const requestOne = await axios.get(ENDPOINT + `/api/doctors-spec/` + input);
        const requestTwo = await axios.get(ENDPOINT + `/api/doctors-name/` + input);

        const res = await axios.all([requestOne, requestTwo]).then(axios.spread((...res)=>{
            const dataOne = res[0].data
            const dataTwo =  res[1].data

            const dataCon = dataOne.concat(dataTwo);

            return dataCon
        })).catch(err =>{
            console.error(err);
        })

        return res
    },

    
}


// module.exports = { DoctorApi }