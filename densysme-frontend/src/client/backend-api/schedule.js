import axios from "axios";

const ENDPOINT = "http://localhost:8000";

export const ScheduleApi = {
  getTimeSlotsOfDoc: async (doctorId, day) => {
    const res = await axios.get(ENDPOINT + "/api/doctor-data/" + doctorId + '/' + day).then((r) => {
      return r.data;
    });
    return res;
  },
  addAnAppointment: async (email, doctorId, day, timeSlot) =>{
    await axios({
      method: "post",
      url: ENDPOINT + `/api/appointment/${email}/${doctorId}/${day}/${timeSlot}`,
    }).catch(err => {
      console.error(err);
    })
  },
  getAllAppointments: async () =>{
    const res = await axios.get(ENDPOINT + "/api/admin/appointments").then(r => {
      return r.data;
    })
    return res;
  },
  confirmAppointment: async (id) =>{
    await axios({
      method: "post",
      url: ENDPOINT + '/api/admin/appointment/' + id,
    }).catch(err => {
      console.error(err);
    })
  },
  rejectAppointment: async (id) =>{
    await axios({
      method: "post",
      url: ENDPOINT + '/api/admin/appointment/reject/' + id,
    }).catch(err => {
      console.error(err);
    })
  },
};
