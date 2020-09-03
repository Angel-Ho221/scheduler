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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const object = {};
  object.student = interview.student;
  object.interviewer = state.interviewers[interview.interviewer];
  console.log("this is object", object)
  console.log("this is interview.student", interview.student)
  console.log("this is state.interviewers[interview.interviewer]", state.interviewers[interview.interviewer])
  return object;

}
