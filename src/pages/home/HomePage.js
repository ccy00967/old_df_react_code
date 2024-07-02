import { Button, ButtonGroup, Container, Grid } from "@mui/material";
import img from '../../assets/img/dronefield_bg.jpg'
import logo from '../../assets/img/dronefield_logo.jpg'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";

export function HomePage() {
    return (
        <div style={{
            height: "100vh",
            backgroundColor: "green",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
        }}>
            <Container sx={{ width: "75%" }} maxWidth="mx">
                <Box sx={{ height: '100vh' }} >

                    <Typography variant="h1" gutterBottom>
                        h1. 드론평야
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        h2. 소개말 등 넣기
                    </Typography>
                </Box>
            </Container>

            <Box height={100}>컴포넌트 사이에 넣을 패딩역할</Box>

            <Container maxWidth="lg">
                <Box sx={{ backgroundColor: "yellow", textAlign: "left" }}>
                    <Typography variant="h1" textAlign={"left"} gutterBottom>
                        h1. 드론평야에 대하여
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        h2. 뭐 더 설명할말 넣기
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        h3. 뭐 더 설명할말 넣기
                    </Typography>
                </Box>
            </Container>

            <Box height={100}>컴포넌트 사이에 넣을 패딩역할</Box>

            <Container maxWidth="lg">
                <Box sx={{ backgroundColor: "yellow", textAlign: "left" }}>
                    <Typography variant="h1" textAlign={"left"} gutterBottom>
                        h1. 그다음에 할말
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        h2. 뭐 더 설명할말 넣기
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        h3. 뭐 더 설명할말 넣기
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        h3. 뭐 더 설명할말 넣기
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        h3. 뭐 더 설명할말 넣기
                    </Typography>
                </Box>
            </Container>
        </div>
    )
}