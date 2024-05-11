import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ResultsPage() {
    const [selectedTournament, setSelectedTournament] = useState<string>("First Team")

    const tournaments = [
        "First Team",
        "PL2",
        "U18",
    ]

    const handleChangeTournament = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTournament(newValue);
    }

    return (
        <>
            <Container maxWidth="xl" sx={{ height: '200px', padding: "0 !important" }}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundImage: `url(${"https://www.premierleague.com/resources/rebrand/v7.145.1/i/elements/backgrounds/primary-bg.svg"})`, backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
                        <Box sx={{ position: 'absolute', top: 0, left: 0, backgroundImage: `url(${"https://www.premierleague.com/resources/rebrand/v7.145.1/i/elements/backgrounds/primary-graphic.svg"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: '0 0' }}>
                        </Box>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Results</Typography>
                </Box>
            </Container >

            <Container>
                <TabContext value={selectedTournament}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTournament} aria-label="lab API tabs example">
                            {tournaments.map((tournament, index) => (
                                <Tab key={index} label={tournament} value={tournament} />
                            ))}
                        </TabList>
                    </Box>

                    {tournaments.map((tournament, index) => (
                        <TabPanel key={index} value={tournament}>
                            <Typography>Results for {tournament}</Typography>
                        </TabPanel>
                    ))}
                </TabContext>
            </Container>
        </>
    );
}
