// initial mode
//mode state withthe intial mode
// reutrn an obj witha mode property

import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (!replace) {
      const newHistory = [...history];
      newHistory.push(newMode);
      setHistory(newHistory);
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();

      setMode(history[history.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}