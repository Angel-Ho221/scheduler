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
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
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

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    const interviewers = getInterviewersForDay(state, state.day);
    return <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
    />
  })

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
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
