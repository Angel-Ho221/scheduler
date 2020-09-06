import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  //using hook if props.interview contains a value - pass useVisualMode the SHOW mode, otherwise, EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    //Transistion to show when promise returned by props.bookInterview resolves
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* user clicks on the add appointment, should trasistion to the CREATE mode. returns an object that contains a transition function */}
      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE) }} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === "SAVING" && <Status message="Saving" />}
    </article>
  )
} 