import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //using hook if props.interview contains a value - pass useVisualMode the SHOW mode, otherwise, EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* user clicks on the add appointment, should trasistion to the CREATE mode. returns an object that contains a transition function */}
      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE) }} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewer}
          // save?
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

    </article>
  )
} 