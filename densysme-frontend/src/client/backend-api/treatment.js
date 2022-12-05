import axios from "axios";

const ENDPOINT = "http://localhost:8000";

export const TreatmentApi = {
    getAppsOfDoc: async(docId) =>{
        const res = await axios.get(ENDPOINT + "/api/med/doctor/" + docId).then(r =>{
            return r.data
        })
        return res
    },
    getHistoryOfPatient: async (patientId) =>{
        const res = await axios.get(ENDPOINT + "/api/med/user/" + patientId).then(r =>{
            return r.data
        })
        return res
    },
    getAllMedRecords: async () =>{
        const res =  await axios.get(ENDPOINT + "/api/med/all").then(r => {
            return r.data
        })
        return res
    },
    updateTreatment: async (treatId, data) =>{ //data is the treatment data
        let treatData = {"treat": data}
        await axios({
            method: "post",
            url: ENDPOINT + "/api/treat/" + treatId,
            data: JSON.stringify(treatData),
            headers: { "Content-Type": "application/json" },
        })
    }
}