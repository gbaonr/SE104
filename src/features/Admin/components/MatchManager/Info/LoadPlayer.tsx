import React, { useState, ChangeEvent } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Typography, TextField, Select, MenuItem, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Match } from "types/Match";
import { Player as ImportedPlayer } from "types/Player";
import { TeamItem } from "components/Items/ClubItem";
type Player = ImportedPlayer & {
  role: string;
};
type LoadingPlayerMatchProps = {
  match: Match;
};
const columns = [
  { id: "player", width: 8 },
  { id: "actions", width: 4 },
];
const LoadingPlayerMatch: React.FC<LoadingPlayerMatchProps> = ({ match }) => {
  const initialPlayers: Player[] = [
    ...(Array.isArray(match.team.players) ? match.team.players : []),
    ...(Array.isArray(match.opponent.players) ? match.opponent.players : [])
  ].map(player => ({
    ...player,
    role: role || 'Line-up', 
  }));
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [showEditPlayer, setShowEditPlayer] = useState<boolean>(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  const [typeToEdit, setTypeToEdit] = useState<string>("add");
  const [team, setTeam] = useState<string>(match.team.name);
  const [jerseyNumber, setJerseyNumber] = useState<string>("");
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>("");
  const [role, setRole] = useState<string>("Line-up");
  const defaultTeam = (teamName: string) => {
    return teamName === match.team.name ? match.team : match.opponent;
  };
  const handleAddPlayer = () => {
    setPlayerToEdit(null);
    setTypeToEdit("add");
    setTeam(match.team.name); 
    setJerseyNumber("");
    setAvatarPreviewUrl("");
    setRole("Line-up"); 
    setShowEditPlayer(true);
  };
  const handleEditPlayer = (player: Player) => {
    setPlayerToEdit(player);
    setTypeToEdit("edit");
    setTeam(player.team.name);
    setJerseyNumber(player.jerseyNumber ? player.jerseyNumber.toString() : "");
    setAvatarPreviewUrl(player.avatar || "");
    setRole(player.role);
    setShowEditPlayer(true);
  };

  const handleDeletePlayer = (playerId: number) => {
    setPlayers((prevPlayers) => prevPlayers.filter(player => player.id !== playerId));
  };

  const handleSavePlayer = () => {
    if (typeToEdit === "add") {
      const newPlayer: Player = {
        id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1, // Unique ID
        fullName: playerToEdit?.fullName || '',
        jerseyNumber: parseInt(jerseyNumber, 10),
        team: defaultTeam(team),
        avatar: avatarPreviewUrl,
        role: role,
        age: playerToEdit?.age || 0,
        nationality: playerToEdit?.nationality || '',
        position: playerToEdit?.position || ''
      };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    } else if (typeToEdit === "edit" && playerToEdit) {
      setPlayers((prevPlayers) =>
        prevPlayers.map(player =>
          player.id === playerToEdit.id
            ? { ...player, fullName: playerToEdit.fullName, jerseyNumber: parseInt(jerseyNumber, 10), team: defaultTeam(team), avatar: avatarPreviewUrl, role: role }
            : player
        )
      );
    }
    setShowEditPlayer(false);
  };
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlayerToEdit((prevState) => ({
          ...prevState!,
          avatar: e.target?.result as string,
        }));
        setAvatarPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const renderCategory = (category: string) => (
    <Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
        {category}
      </Typography>
    </Grid>
  );
  
  const renderPlayerRows = (players: Player[], role: string, teamName: string) => {
    const filteredPlayers = players.filter(player => player.role === role && player.team.name === teamName);
  
    return (
      <Grid container item xs={12} spacing={0} sx={{ mt: 4 }}>
        {filteredPlayers.map(player => (
          <React.Fragment key={player.id}>
            <Grid container item xs={12} alignItems="center" sx={{ p: "0.5rem !important" }}>
              <Grid item xs={10}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {player.avatar && (
                    <img
                      src={player.avatar}
                      alt="Player Avatar"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        marginRight: '15px',
                      }}
                    />
                  )}
                  <Typography variant="body1">{`${player.jerseyNumber}  ${player.fullName}`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton size="small" onClick={() => handleEditPlayer(player)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeletePlayer(player.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    );
  };
  return (
    <>
      {showEditPlayer && (
        <Dialog open={showEditPlayer} onClose={() => setShowEditPlayer(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{typeToEdit === "add" ? "Add" : "Edit"} Player</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography>Full Name:</Typography>
              <TextField
                fullWidth
                value={playerToEdit?.fullName || ''}
                onChange={(e) => setPlayerToEdit({ ...playerToEdit!, fullName: e.target.value })}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Jersey Number:</Typography>
              <TextField
                fullWidth
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Team:</Typography>
              <Select
                fullWidth
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <MenuItem value={match.team.name}>{match.team.name}</MenuItem>
                <MenuItem value={match.opponent.name}>{match.opponent.name}</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Role:</Typography>
              <Select
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Line-up">Line-up</MenuItem>
                <MenuItem value="Substitution">Substitution</MenuItem>
                <MenuItem value="Registered">Registered</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Avatar:</Typography>
              <Button variant="outlined" component="label" startIcon={<AddBoxIcon />}>
                Upload
                <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
              </Button>
              {avatarPreviewUrl && (
                <img
                  src={avatarPreviewUrl}
                  alt="Avatar Preview"
                  style={{
                    display: 'block',
                    marginTop: '10px',
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditPlayer(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSavePlayer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Box sx={{ backgroundColor: "white", borderRadius: 2, my: 2, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.7rem", color: "#37003c" }}>Players</Typography>
          <Button
            variant="outlined"
            onClick={handleAddPlayer}
            sx={{ color: "white", backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#4caf50" } }}
          >
            Add Player
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <TeamItem team={match.team} />
            </Box>
            {renderPlayerRows(players, "Line-up", match.team.name)}
          </Grid>

          <Grid item xs={2}>
            {renderCategory("Line-up")}
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <TeamItem team={match.opponent} />
            </Box>
            {renderPlayerRows(players, "Line-up", match.opponent.name)}
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            {renderPlayerRows(players, "Substitution", match.team.name)}
          </Grid>

          <Grid item xs={2}>
            {renderCategory("Substitution")}
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            {renderPlayerRows(players, "Substitution", match.opponent.name)}
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            {renderPlayerRows(players, "Registered", match.team.name)}
          </Grid>

          <Grid item xs={2}>
            {renderCategory("Registered")}
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            {renderPlayerRows(players, "Registered", match.opponent.name)}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default LoadingPlayerMatch;
