import React, { useState, useEffect } from "react";
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors.js';


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) { // this interview is greyed out, but i thought we used it in line 22?
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //It's because on index.js, this interview input will be the interview object that will be updating the appointment data 
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment //Here, we are assigning the updated appointment to the appointments objects
    };
    //call setState wtih the new state object (do promise here)
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(setState({ ...state, appointments }))
      .catch(error => console.log(error));
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

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(setState({ ...state, appointments }))
      .catch(error => console.log(error));
  }

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
      .catch(error => console.log(error));
  }, []);


  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);


    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};