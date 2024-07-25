import { Button, ButtonGroup, Container, Grid, Stack } from "@mui/material";
import img from '../../assets/img/dronefield_bg.jpg'
import logo from '../../assets/img/dronefield_logo.jpg'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";


//alignItems="center"
//alignContent='center'
export function HomePage() {
    return (
        <div style={{
            height: "100vh",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Stack width='100%'>
                <Box
                    //width='100vh'
                    height='40%'
                >
                </Box>

                <Box
                    width='100%'
                    height='30%'
                    display="flex"
                    alignItems="center"
                //alignContent='start'
                //bgcolor='yellow'
                >
                    <Stack paddingLeft="5%">
                        <Typography
                            variant="h1"
                            color='white'
                            fontWeight={"bold"}
                        >
                            드론평야
                        </Typography>
                        <Typography
                            variant="h2"
                            color='white'
                            fontWeight={"bold"}
                        >
                            방제를 편하게!
                        </Typography>
                        <Button
                            href="/detail">123123123
                        </Button>
                    </Stack>
                </Box>

                <Box
                    width='100%'
                    height='30%'
                    display='flex'
                    alignItems="start"
                    justifyContent="center"
                >
                    <Box
                        paddingLeft='50%'
                        //bgcolor='black'
                    >
                        <Button
                            size="large"
                            variant="contained"
                            href="/service" >
                            방제 신청
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </div >
    )
}