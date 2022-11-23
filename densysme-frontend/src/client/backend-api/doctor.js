import axios from "axios";

const ENDPOINT = "http://localhost:8000";

export const DoctorApi = {
    getAllDoctors: async () =>{
        const res = await axios.get(ENDPOINT + "/api/doctors").then((r)=>{
            // console.log(res.data);
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

}


// module.exports = { DoctorApi }