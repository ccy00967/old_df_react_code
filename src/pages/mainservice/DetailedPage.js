import { Box, Button, Container, CssBaseline, Stack, TextField, Typography,Grid, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { server } from "../../components/login_fuc";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { dark } from '@mui/material/styles/createPalette';


export function DetailedPage() {
    
return (
        <div>
            <Stack sx={{alignItems:'center'}}>
                <Box
                sx={{height:130}}/>
                <Typography component="h1" variant="h4">
                            방제 신청서
                         </Typography>
                <Box
                sx={{height:70}}/>

                <Grid container spacing={0} sx={{width:'50%', }}>
                    <Grid item xs={4}>
                    <AccountCircleIcon sx={{ fontSize: 90, color: dark.contrastText }} />
                    </Grid>
                    <Grid item xs={3}>
                    <Typography component="h1" variant="h6" >사용자 이름</Typography>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h1" variant="h6" >010 - xxxx - xxxx</Typography>   
                    </Grid>
                </Grid>
                
                <Typography component="h1" variant="h6" >방제 주소</Typography>
                <Typography component="h1" variant="h6" >방제 규모</Typography>
                <Typography component="h1" variant="h6" >작물 종류</Typography>
                <Typography component="h1" variant="h6" >예약날짜</Typography>      
                
            </Stack>
            
        </div>
 )

}