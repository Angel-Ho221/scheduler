import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {
  //using hook if props.interview contains a value - pass useVisualMode the SHOW mode, otherwise, EMPTY
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function to save an interview
  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    wait(1000).then(() => transition(SHOW))
      .catch(error => console.log(error));
  }

  //function to delete an interview
  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    wait(1000).then(() => transition(EMPTY))
      .catch(error => console.log(error));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* user clicks on the add appointment, should transistion to the CREATE mode. returns an object that contains a transition function */}

      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE) }} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        // let user confirm before deleting an interview. if cancel, then go bk, if confirm, delete it
        <Confirm
          onCancel={() => back()}
          message="Are you sure you wish to delete this interview?"
          onConfirm={deleteInterview}
        />
      )}
    </article>
  )
};