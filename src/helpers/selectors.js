export function getAppointmentsForDay(state, day) {
  const box = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.appointments.forEach((apptId) => {
        box.push(state.appointments[apptId]);
      })
    }

  });
  return box.length ? box : [];
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const newInterview = {
    ...interview,
    interviewer: { ...state.interviewers[interview.interviewer] }
  }
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  const box = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.interviewers.forEach((interviewerId) => {
        box.push(state.interviewers[interviewerId]);
      })
    }
  });
  return box.length ? box : [];
}