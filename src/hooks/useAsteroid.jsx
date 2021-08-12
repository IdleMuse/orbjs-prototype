import React, { useState } from "react";
import Orb from "../lib/orb.v2";
import DatGui, { DatNumber } from "@tim-soft/react-dat-gui";

const asteroidDefaults = {
  gm: 2.9591220828559093e-4, //in au^3/d^2
  eccentricity: 0.08728849329001058,
  inclination: 6.812676631845272, //in degree
  longitude_of_ascending_node: 250.5660658100269, //in degree
  argument_of_periapsis: 95.63473165761138, //in degree
  time_of_periapsis: 2456918.756066796, //in jd
  semi_major_axis: 1.001911878091084 //in au
};

const useAsteroid = () => {
  const [orbitalParams, setOrbitalParams] = useState(asteroidDefaults);
  const updateOrbitalParams = (newData) =>
    setOrbitalParams((currentParams) => ({ ...currentParams, ...newData }));

  const orb = new Orb.Kepler(orbitalParams);

  const renderStats = (date) => {
    const coords = orb.xyz(date);
    return <pre>{JSON.stringify(coords, null, 3)}</pre>;
  };

  const renderSVG = (date) => {
    const coords = orb.xyz(date);
    return <circle cx={coords.x} cy={coords.y} r="0.01" fill="grey" />;
  };

  const renderControls = () => (
    <DatGui data={orbitalParams} onUpdate={updateOrbitalParams}>
      <DatNumber
        path="gm"
        label="gm (au^3/d^2)"
        min={0}
        max={10e-4}
        step={0.5e-4}
      />
      <DatNumber
        path="eccentricity"
        label="eccentricity"
        min={0}
        max={0.99}
        step={0.01}
      />
      <DatNumber
        path="inclination"
        label="inclination (degrees)"
        min={0}
        max={360}
        step={1}
      />
      <DatNumber
        path="longitude_of_ascending_node"
        label="longitude of ascending node (degrees)"
        min={0}
        max={360}
        step={1}
      />
      <DatNumber
        path="argument_of_periapsis"
        label="argument of periapsis (degrees)"
        min={0}
        max={360}
        step={1}
      />
      <DatNumber
        path="time_of_periapsis"
        label="time of periapsis (jd)"
        min={0}
        max={5000000}
        step={10000}
      />
      <DatNumber
        path="semi_major_axis"
        label="semi-major axis (au)"
        min={0}
        max={4}
        step={0.1}
      />
    </DatGui>
  );

  return { renderStats, renderSVG, renderControls };
};

export default useAsteroid;
