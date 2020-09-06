import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {
  //using hook if props.interview contains a value - pass useVisualMode the SHOW mode, otherwise, EMPTY
  // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function to save an interview
  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //function to delete an interview
  function deleteInterview() {

    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* user clicks on the add appointment, should transistion to the CREATE mode. returns an object that contains a transition function */}

      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE) }} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you wish to delete this interview?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error, cannot delete appointment."
          onClose={back} />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Error, cannot save appointment."
          onClose={back} />
      )}
    </article>
  )
};