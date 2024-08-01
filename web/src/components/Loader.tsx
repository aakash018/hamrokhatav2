import { SpinnerBall } from "@phosphor-icons/react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <SpinnerBall size={32} className="animate-spin" />
      <div>Loading</div>
    </div>
  );
};

export default Loader;
