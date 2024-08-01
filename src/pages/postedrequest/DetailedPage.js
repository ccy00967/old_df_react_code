import { Box, Button, Container, CssBaseline, Stack, TextField, Typography, Grid, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { server } from "../../pages/login/login_fuc";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { dark } from '@mui/material/styles/createPalette';
import { grey } from "@mui/material/colors";
import store from "../../state/store";
import { data } from "jquery";
import {getDetailed} from "./detailed_fuc";


 
// const CustomerRequestForm = {
//     address: "",
//     cropsinfo: "",
//     ownerName: "",
//     requestContent: "",
//     reservationDate: "",
// }
export function DetailedPage() {

   
    const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate();
    const [detail,setdetail] = useState([]);
    const [detailaddress,setdetailaddress] = useState([]);
    const [detailowner,setdetailowner] = useState([]);
    useEffect(() => {
        getDetailed(setdetail,setdetailaddress,setdetailowner)
        
    }, [])
    
   // console.log(detail2.jibunAddress)
   

    return (
        <div>
            <Stack sx={{ alignItems: 'center', justifyItems: 'center' }}>
                {/* {customerRequests((value) =>())} */}

                <Box
                    sx={{ height: 130 }} />
                <Typography component="h1" variant="h4">
                    방제 신청서
                </Typography>



                <Box sx={{ height: 70 }} />

                {/* <Button onClick={getDetailed}>getrequests</Button> */}


                <Box sx={{ width: '40%', borderBottom: 1, borderColor: 'grey.500' }}>


                    <Grid container spacing={0} alignItems="center">


                        <Grid item xs={2}>
                            <AccountCircleIcon sx={{ fontSize: 90, color: dark.contrastText }} />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography component="h1" variant="h6" >{detailowner.name}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography component="h1" variant="h6" >{detailowner.phone_number}</Typography>
                        </Grid>
                    </Grid>
                </Box>



                <Box sx={{ height: 10 }} />




                <Grid container spacing={3} sx={{ width: '400px' }}>
                    <Grid item xs={5}>
                        <Typography sx={{ border: 1, borderRadius: 2, color: 'lightblue', }}>수락 대기중</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ border: 1, borderRadius: 2, color: 'lightgreen' }}>진행중</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ border: 1, borderRadius: 2, color: 'grey.500' }}>방제 완료</Typography>
                    </Grid>
                </Grid>



                <Box sx={{ height: 10 }} />



                <Box sx={{ width: '40%', borderBottom: 1, borderColor: 'grey.500' }}>

                    <Stack spacing={3}>
                        <Typography component="h1" variant="h6" >{detailaddress.jibunAddress}</Typography>

                        <Typography component="h1" variant="h6" >{detail.size}평</Typography>

                        <Typography component="h1" variant="h6" >{detail.cropsinfo}</Typography>

                        <Typography component="h1" variant="h6" >{detail.reservationDate}</Typography>
                    </Stack>

                    <Box sx={{ height: 20 }} />
                </Box>

                <Box sx={{ height: 30 }} />



                <Grid container spacing={5} sx={{ width: '350px' }}  >
                    <Grid item xs={6} >
                        <Typography sx={{ height: '80px', color: '#FFCC00', borderRadius: '10px', border: 1 }} >방제 미완</Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Box sx={{ height: '80px', backgroundColor: 'lightgreen', borderRadius: '10px', }} >방제 완료</Box>
                    </Grid>
                </Grid>

                <Box sx={{ height: '30px' }} />


                <Button variant="contained" sx={{ width: '400px', borderRadius: 2 }}>방제 완료로 변경하기</Button>

                <Box sx={{ height: '30px' }} />
                <Box sx={{ width: '350px' }}>

                    <Card
                        sx={{
                            height: 250,
                            border: 1,
                            borderRadius: '25px',
                            borderColor: 'grey.500'
                        }}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                방제 업체
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                로고
                            </Typography>

                            <Stack spacing={5}>
                                <Typography>방제 업체 정보</Typography>
                                <Typography>방제 업체 정보</Typography>
                                <Typography>방제 업체 정보</Typography>
                            </Stack>

                        </CardContent>

                    </Card>
                </Box>
                <Box sx={{ height: '40px' }} />


            </Stack>

        </div>
    )

}