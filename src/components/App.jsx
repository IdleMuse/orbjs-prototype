import React, { useState } from "react";
import useInterval from "@use-it/interval";
import useAsteroid from "../hooks/useAsteroid";
import { addMilliseconds } from "date-fns/esm/fp";

const App = ({ ...props }) => {
  const [running, setRunning] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeMachine, setTimeMachine] = useState(1);
  const reset = () => {
    setRunning(false);
    setDate(new Date());
    setTimeMachine(1);
  };

  useInterval(
    () => {
      setDate((d) => addMilliseconds(15 * timeMachine)(d));
    },
    running ? 15 : null
  );

  const asteroid = useAsteroid();

  return (
    <>
      <label>Date: {date.toISOString()}</label>
      <div class="row">
        <button onClick={() => setRunning((paused) => !paused)}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => setTimeMachine((dt) => dt * 2)}>
          Time: x{timeMachine}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <svg className="fullscreen" viewBox="-2 -2 4 4">
        <circle cx="0" cy="0" r="0.05" fill="goldenrod" />
        {asteroid.renderSVG(date)}
      </svg>
      {asteroid.renderStats(date)}
      {asteroid.renderControls()}
    </>
  );
};

export default App;
