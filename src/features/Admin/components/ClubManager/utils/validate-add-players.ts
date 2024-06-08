import { Player } from "../apis/types";

export const validateAddPlayers = (player: Player) => {
  if (!player.player_name) {
    return "Please enter player's name";
  }
  if (!player.player_bday) {
    return "Please enter player's birthday";
  }
  if (!player.player_pos) {
    return "Please enter player's position";
  }
  if (!player.player_nation) {
    return "Please enter player's nation";
  }
  if (!player.js_number) {
    return "Please enter player's jersey number";
  }
  return "";
};
