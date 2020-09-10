import { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //call setState wtih the new state object (do promise here)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => axios.get(`http://localhost:8001/api/days`))

      .then((response) => {
        const days = response.data
        setState({ ...state, appointments, days })
      })
  }
  //When we cancel an interview it will have its value set to null.If the interview is null and we are still in the SHOW mode then we may get a TypeError.
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => axios.get(`http://localhost:8001/api/days`))
      .then((response) => {
        const days = response.data
        setState({ ...state, appointments, days })
      })
  }

  //returning object of four keys
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
} 
