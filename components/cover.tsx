import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { particlesOptions } from "./particlesOptions";

export const Cover = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};
