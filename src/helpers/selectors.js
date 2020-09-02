export function getAppointmentsForDay(state, day) {
  const box = [];
  //find the obj in state.days array whos name matches the provided day
  //see if id matches with states.appt and return it
  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.appointments.forEach((apptId) => {
        box.push(state.appointments[apptId]);
      })
    }

  });
  //return the length of appointment or an empty box if no appt 
  return box.length ? box : [];

};
