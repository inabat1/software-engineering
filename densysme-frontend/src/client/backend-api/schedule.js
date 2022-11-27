import axios from "axios";

const ENDPOINT = "http://localhost:8000";

export const ScheduleApi = {
  getAllTimeSlots: async () => {
    const res = await axios.get(ENDPOINT + "/api/schedule").then((r) => {
      // console.log(res.data);
      return r.data;
    });
    return res;
  },

  deleteSchedule: async (doctorId) => {
    const res = await axios.delete(ENDPOINT + `/api/schedule/${scheduleId}`).then((r)=>{
        return r.status
    })
    return res
}
};
