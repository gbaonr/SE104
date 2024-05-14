import {Box, Grid, styled, Typography } from "@mui/material";
import Stadium from "@mui/icons-material/Stadium";
import { useEffect } from "react";

interface Player {
    playerID: string;
    playerName: string;
    pl_bday: Date;
    pl_club: string;
    pl_position: string;
}



