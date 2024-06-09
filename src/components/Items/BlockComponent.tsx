import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface BlockComponentProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Accepts additional sx prop
}

export const BlockComponent: React.FC<BlockComponentProps> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        flexDirection: "column",
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
