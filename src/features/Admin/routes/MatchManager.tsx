import { MatchManger } from "../components/MatchManager";

type MatchManagerRouteProps = {
  setForceUpdate: (value: number) => void;
  forceUpdate: number;
};

export const MatchManagerRoute = ({ setForceUpdate, forceUpdate }: MatchManagerRouteProps) => {
  return (
    <>
      <MatchManger forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />
    </>
  );
};
