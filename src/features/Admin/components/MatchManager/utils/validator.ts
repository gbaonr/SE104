import { Club, Player } from "../../ClubManager/apis/types";
import { Match, MatchEvent, Referee } from "../apis/types";

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

export const validateMatch = (match: Match, clubs: Club[], referees: Referee[]) => {
  if (!match.start) {
    return "Match must have a start time";
  }

  if (!match.finish) {
    return "Match must have an end time";
  }

  if (!match.team1) {
    return "Match must have a home team";
  }

  if (!match.team2) {
    return "Match must have an away team";
  }

  if (!clubs.find((club) => club.club_id === match.team1)) {
    return "Home team does not exist";
  }

  if (!clubs.find((club) => club.club_id === match.team2)) {
    return "Away team does not exist";
  }

  if (!match.ref) {
    return "Match must have a referee";
  }

  if (!referees.find((referee) => referee.ref_id === match.ref)) return "Referee does not exist";

  if (!match.var) return "Match must have a VAR";

  if (!referees.find((referee) => referee.ref_id === match.var)) return "VAR does not exist";

  if (!match.lineman) return "Match must have a linesman";

  if (!referees.find((referee) => referee.ref_id === match.lineman))
    return "Linesman does not exist";

  if (match.finish < match.start) {
    return "Match finish time must be after start time";
  }

  if (match.team1 === match.team2) {
    return "Home team and away team must be different";
  }

  return "";
};

export const validateUser = (user: User) => {
  if (!user.full_name) {
    return "Full name must not be empty";
  }

  if (!user.role) {
    return "Role must not be empty";
  }

  if (!user.user_name) {
    return "User name must not be empty";
  }

  if (!user.user_mail) {
    return "User mail must not be empty";
  }

  if (!user.user_nation) {
    return "User nation must not be empty";
  }

  if (!user.user_bday) {
    return "User birthday must not be empty";
  }

  return "";
};
