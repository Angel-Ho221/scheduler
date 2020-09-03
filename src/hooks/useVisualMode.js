// initial mode
//mode state withthe intial mode
// reutrn an obj witha mode property

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setMode(newMode);
    replace ?
      setHistory(prev => [newMode, ...(prev.slice(1))])
      :
      setHistory(prev => [newMode, ...prev]);
  }
  const back = () => {
    if (history.length > 1) {
      setMode(history[1]);
      setHistory(prev => prev.slice(1));
    }
  }

  return {
    mode,
    transition,
    back
  }
}