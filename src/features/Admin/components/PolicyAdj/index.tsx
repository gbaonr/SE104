import React, { useState, DragEventHandler, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { getParamsApi } from "./apis/get-params";
import { updateParamsApi } from "./apis/update-params";
import { toast } from "react-toastify";
import { Params } from "./apis/types";

type PolicyAdjustmentProps = {
  initialAgeRange?: [number, number];
  initialTimeGoal?: number;
  initialGoalTypes?: string[];
  initialPoints?: {
    win: number;
    draw: number;
    lose: number;
  };
  initialPlayerCount?: {
    min: number;
    max: number;
  };
  initialForeignPlayers?: number;
};

type Points = {
  win: number;
  draw: number;
  lose: number;
};

type initialPlayerCount = {
  min: number;
  max: number;
};

export const PolicyAdj = () => {
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 0]);
  const [timeGoal, setTimeGoal] = useState<number>(0);
  const [goalTypes, setGoalTypes] = useState<string[]>([]);
  const [points, setPoints] = useState<Points>({
    win: 0,
    draw: 0,
    lose: 0,
  });
  const [playerCount, setPlayerCount] = useState<initialPlayerCount>({
    min: 0,
    max: 0,
  });
  const [foreignPlayers, setForeignPlayers] = useState<number>(0);
  const [criteriaList, setCriteriaList] = useState<string[]>([
    "Points",
    "Goal Difference",
    "Goals Scored",
    "Goals Conceded",
  ]);

  useEffect(() => {
    const fetchParams = async () => {
      const response = await getParamsApi();
      console.log(response);

      if (response?.status === "success") {
        const responseData = response.data;

        setPlayerCount({
          min: responseData.min_club_player,
          max: responseData.max_club_player,
        });

        setForeignPlayers(responseData.max_foreign_player);
        setAgeRange([responseData.min_player_age, responseData.max_player_age]);

        // TODO: wait for response fix format --> update this
        setTimeGoal(Number(responseData.max_goal_time));

        // TODO: fix goal types
        setGoalTypes(new Array(responseData.max_goal_types).fill(""));

        setPoints({
          win: responseData.points_win,
          draw: responseData.points_draw,
          lose: responseData.points_lose,
        });

        const criteriaPriority = responseData.priority.split(";");

        const criteriaList = criteriaPriority.map((criteria) => {
          if (criteria === "p") return "Points";
          if (criteria === "d") return "Goal Difference";
          if (criteria === "g") return "Goals Scored";
          if (criteria === "h") return "Goals Conceded";
        });
        
        setCriteriaList(criteriaList);
      } else {
        toast.error("Failed to load params");
      }
    };
    fetchParams();
  }, []);

  const handleAddGoalType = () => {
    setGoalTypes([...goalTypes, ""]);
  };

  const handleRemoveGoalType = (index: number) => {
    setGoalTypes(goalTypes.filter((_, i) => i !== index));
  };

  const handleGoalTypeChange = (index: number, value: string) => {
    const newGoalTypes = [...goalTypes];
    newGoalTypes[index] = value;
    setGoalTypes(newGoalTypes);
  };

  const handlePointsChange = (type: "win" | "draw" | "lose", value: number) => {
    setPoints({ ...points, [type]: value });
  };

  const handleAgeRangeChange = (type: "min" | "max", value: number) => {
    setAgeRange(type === "min" ? [value, ageRange[1]] : [ageRange[0], value]);
  };

  const handleTimeGoalChange = (value: number) => {
    setTimeGoal(value);
  };

  const handlePlayerCountChange = (type: "min" | "max", value: number) => {
    setPlayerCount(
      type === "min" ? { ...playerCount, min: value } : { ...playerCount, max: value },
    );
  };

  const handleForeignPlayersChange = (value: number) => {
    setForeignPlayers(value);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedList = [...criteriaList];
      const temp = updatedList[index];

      updatedList[index] = updatedList[index - 1];
      updatedList[index - 1] = temp;

      setCriteriaList(updatedList);
    }
  };

  // const handleOnSaveChanges =
  // above function input a dictionary of the updated values and send it to the backend
  // the backend will update the values in the database

  const handleOnSaveChanges = (params: Params) => {
    updateParamsApi(params).then((response) => {
      if (response?.status === "success") {
        toast.success("Params updated successfully");
      } else {
        toast.error("An error occurred while trying to update params");
      }
    });
  };

  const handleMoveDown = (index: number) => {
    if (index < criteriaList.length - 1) {
      const updatedList = [...criteriaList];
      const temp = updatedList[index];
      updatedList[index] = updatedList[index + 1];
      updatedList[index + 1] = temp;
      setCriteriaList(updatedList);
    }
  };

  const handleDragOver: DragEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    const dragIndex = Number(event.dataTransfer.getData("text/plain"));
    const index = Number(event.currentTarget.dataset.index);
    if (dragIndex !== index) {
      const updatedList = [...criteriaList];
      const [dragItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(index, 0, dragItem);
      setCriteriaList(updatedList);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 2,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            Team Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Age Range
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={ageRange[0]}
                onChange={(e) => handleAgeRangeChange("min", Number(e.target.value))}
                label="Min Age"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                type="number"
                value={ageRange[1]}
                onChange={(e) => handleAgeRangeChange("max", Number(e.target.value))}
                label="Max Age"
                variant="outlined"
                sx={{ flexGrow: 1, ml: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Player Count
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={playerCount.min}
                onChange={(e) => handlePlayerCountChange("min", Number(e.target.value))}
                label="Min Players"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                type="number"
                value={playerCount.max}
                onChange={(e) => handlePlayerCountChange("max", Number(e.target.value))}
                label="Max Players"
                variant="outlined"
                sx={{ flexGrow: 1, ml: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Number of Foreign Players
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={foreignPlayers}
                onChange={(e) => handleForeignPlayersChange(Number(e.target.value))}
                label="Foreign Players"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleOnSaveChanges({
                  min_player_age: ageRange[0],
                  max_player_age: ageRange[1],
                  min_club_player: playerCount.min,
                  max_club_player: playerCount.max,
                  max_foreign_player: foreignPlayers,
                })
              }
            >
              Save Changes
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            Match Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Time Goal (minutes)
            </Typography>
            <TextField
              type="number"
              value={timeGoal}
              onChange={(e) => handleTimeGoalChange(Number(e.target.value))}
              label="Max Time"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Goal Types
            </Typography>
            {goalTypes.map((type, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TextField
                  value={type}
                  onChange={(e) => handleGoalTypeChange(index, e.target.value)}
                  label={`Goal Type ${index + 1}`}
                  variant="outlined"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveGoalType(index)}>
                  <RemoveCircleIcon color="error" />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleAddGoalType}>
              Add Goal Type
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            League Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Points System
            </Typography>
            <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
              <TextField
                type="number"
                value={points.win}
                onChange={(e) => handlePointsChange("win", Number(e.target.value))}
                label="Points for Win"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
            <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
              <TextField
                type="number"
                value={points.draw}
                onChange={(e) => handlePointsChange("draw", Number(e.target.value))}
                label="Points for Draw"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>

            <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
              <TextField
                type="number"
                value={points.lose}
                onChange={(e) => handlePointsChange("lose", Number(e.target.value))}
                label="Points for Lose"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Criteria Priority Adjustment
            </Typography>
            <List>
              {criteriaList.map((criteria, index) => (
                <ListItem key={index} data-index={index} onDragOver={handleDragOver} draggable>
                  <ListItemText primary={criteria} />
                  <ListItemIcon>
                    <IconButton onClick={() => handleMoveUp(index)}>
                      <ArrowUpwardIcon style={{ color: "green" }} />
                    </IconButton>
                    <IconButton onClick={() => handleMoveDown(index)}>
                      <ArrowDownwardIcon style={{ color: "red" }} />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const criteriaPriority = criteriaList
                  .map((criteria) => {
                    if (criteria === "Points") return "p";
                    if (criteria === "Goal Difference") return "d";
                    if (criteria === "Goals Scored") return "g";
                    if (criteria === "Goals Conceded") return "h";
                  })
                  .join(";");

                handleOnSaveChanges({
                  points_win: points.win,
                  points_draw: points.draw,
                  points_lose: points.lose,
                  priority: criteriaPriority,
                });
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyAdj;
