import React, { useState } from "react";
import useInterval from "@use-it/interval";
import DatGui, { DatNumber } from "@tim-soft/react-dat-gui";

const App = ({ ...props }) => {
  const [t, setT] = useState(0);
  const [params, setParams] = useState({
    speed: 0.0001,
    radius: 500
  });
  const guiUpdate = (newData) => setParams({ ...params, ...newData });

  useInterval(() => {
    setT((t) => t + 1);
  }, 15);

  const x = Math.sin(t * params.speed * Math.PI) * params.radius;
  const y = Math.cos(t * params.speed * Math.PI) * params.radius;

  return (
    <>
      <DatGui data={params} onUpdate={guiUpdate} liveUpdate={false}>
        <DatNumber
          path="speed"
          label="speed"
          min={0}
          max={0.01}
          step={0.0001}
        />
        <DatNumber path="radius" label="radius" min={0} max={1000} step={1} />
      </DatGui>
      <svg className="fullscreen" viewBox="-1000 -1000 2000 2000">
        <circle cx="0" cy="0" r="50" fill="goldenrod" />
        <circle cx={x} cy={y} r="15" fill="lightseagreen" />
      </svg>
    </>
  );
};

export default App;
