import axios from "axios"
const ENDPOINT = "http://localhost:8000"

export const PatientApi = {
    getAllPatients: async () => {
        const res = await await axios.get(ENDPOINT + '/api/users').then((r) =>{
            return r.data
        })
        return res
    },
    getPatientById: async (patientId) => {
        const res = await axios.get(ENDPOINT + "/api/users/" + patientId).then((r) =>{
            return r.data
        })
        return res
    },
    addPatient: async (data) => {
        const res = await axios({
            method: "post",
            url: ENDPOINT + "/api/register-user",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
        return res
    },
    editPatientById: async (patientId, data) => {
        console.log(data);
        const res = await axios({
            method: "put",
            url: ENDPOINT + '/api/users/' + patientId,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json"},
        })
        
        return res
    },
    deletePatient: async (patientId) => {
        const res = await axios.delete(ENDPOINT + `/api/users/${patientId}`).then((r)=>{
            return r.status
        })
        return res
    },
}

// module.exports = { PatientApi }