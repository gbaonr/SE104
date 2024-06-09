import { Player } from "../../ClubManager/apis/types";
import { Match, MatchEvent } from "../apis/types";

export const validateEventMatch = (event: MatchEvent, match: Match, players: Player[]) => {
  if (event.match_id !== match.match_id) {
    return "Event does not belong to the match";
  }

  if (!event.events) {
    return "Event must have a description";
  }

  if (!event.seconds) {
    return "Event must have a time";
  }

  if (!event.team_id) {
    return "Event must have a team";
  }

  if (!event.player_id) {
    return "Event must have a player";
  }

  // check if event.team_id is in match.teams
  if (![match.team1, match.team2].includes(event.team_id)) {
    return "Team does not belong to the match";
  }

  // check if event.player_id is in players
  if (
    !players
      .filter((e) => e.player_club == event.team_id)
      .find((player) => player.player_id === event.player_id)
  ) {
    return "Player does not exist";
  }

  return "";
};
