import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const spotsRemaining = `${props.spots === 0 ? 'no' : props.spots} ${props.spots === 1 ? 'spot' : 'spots'} remaining`;

  return (
    <li className={dayClass} data-testid="day"
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );

}