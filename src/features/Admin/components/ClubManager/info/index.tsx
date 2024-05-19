import { Team } from "types/Team";

type TeamDetailInfoProps = {
  team: Team;
};

export const TeamDetailInfo = ({ team }: TeamDetailInfoProps) => {
  return (
    <div>
      <h1>{team.name}</h1>
    </div>
  );
};
