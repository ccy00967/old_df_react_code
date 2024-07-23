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
            overflow: 'hidden',
        }}>
            <Container sx={{ width: "75vh" }} maxWidth="mx">
                <Box sx={{ height: '100vh', 
                           position: "fixed",
                           left: '10vh', top: '40vh',
                            
                            }} >

                    <Typography     sx={{
                        fontSize: '12vh',
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                    >
                        드론평야
                    </Typography>
                    <Typography sx={{
                        fontSize: '8vh',
                        fontWeight: 'bold',
                        color: 'white'}}>
                        방제를 편하게!
                    </Typography>
                </Box>
                <Box>
                    <Button 
                    variant="contained" 
                    color="success" 
                    href="/service" 
                    component = "a"
                    sx={{position: 'fixed',
                        right: '30vh',
                        bottom: '22vh',
                        width: '30vh',
                        height: '13vh',
                        borderRadius: '4vh',
                        fontSize: '4vh',
                       
                    }}>
                        방제 신청</Button>
                </Box>
            </Container>
            
        </div>
    )
}