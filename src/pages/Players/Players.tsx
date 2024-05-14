import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderPage from '../../components/Header/PageHeader';
import { Box, Container } from '@mui/material';
import { TabContext } from '@mui/lab';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#AFD4E6",
        color: "black",
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    position: string,
    nationality: string,
) {
    return { name, position, nationality };
}

const rows = [
    createData('Hoang Cong Chien', 'Forward', 'Vietnam'),
    createData('Nguyen Gia Bao', 'Defender', 'Vietnam'),
    createData('Tran Gia Bao', 'Midfielder', 'Vietnam'),
    createData('Pham Nguyen Anh', 'Forward', 'Vietnam'),
    createData('Duong Tien Hoang', 'Defender', 'Vietnam'),
    createData('Jason Susanto', 'Duelist', 'Indonesia'),
    createData('Texture', 'Duelist', 'Korea'),
    createData('Erik Santos', 'Duelist', 'Brazil'),
];

export default function CustomizedTables() {
    return (
        <>
            <HeaderPage headerName="Players"/>


            <Container>
                <TabContext value={"Hello"}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Position</StyledTableCell>
                                    <StyledTableCell align="right">Nationality</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.position}</StyledTableCell>
                                        <StyledTableCell align="right">{row.nationality}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </TabContext>
            </Container>
        </>
    );
}
