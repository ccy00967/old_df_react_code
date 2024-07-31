import { Box, Button, Container, CssBaseline, Stack, TextField, Typography, Grid, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../pages/login/login_fuc";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {postCustomerRequest } from "./requestFormfuc";
import { NaverMaps } from "../../components/naver_maps/NaverMaps";


export function RequestFormPage() {

    const open = useDaumPostcodePopup();
    const dispatch = useDispatch();

    const handleComplete = (data) => {
        console.log(data);
    
    };

    const handleClick = (e) => {
        open({ onComplete: handleComplete });
        e.preventDefault();
    };

    const address = useSelector(state => { return state.address; });
    const navigate = useNavigate(); // 리액트 페이지 라우트


    const [requestContent, setContent] = useState('');
    const [cropsinfo, setCropsinfo] = useState('');
    const [size, setSize] = useState('');
    const [reservationDate, setDate] = useState(dayjs('').format('YYYY-MM-DDTHH:mm:ss')); // 날짜관리 패키지 dayjs를 사용 - 이유: mui 추천
    

    // useEffect(() => {
    //     if (userInfo.success === true) {
    //         navigate("/");
    //     }
    // });

    // const loginFormInit = {
    //     email: '',
    //     password: '',
    // }

    return (
        <div>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    component="form"
                    sx={{
                        // width: '100%',
                        marginTop: 10,
                        //display: 'flex',
                        //flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Stack spacing={3}>
                        <Box sx={{ height: '40' }}></Box>
                        <Typography component="h1" variant="h4">
                            방제 신청서 작성
                        </Typography>



                        <div className="MapApp">
                            <NaverMaps />
                        </div>


                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko" >
                            <DateTimePicker
                                label="원하는 날짜 입력"
                                //value={reservationDate}
                                onChange={(value) => {
                                    setDate(dayjs(value).format('YYYY-MM-DDTHH:mm:ss'))
                                    //console.log(reservationDate)
                                }}

                            />
                        </LocalizationProvider>

                        <TextField
                            margin="normal"
                            required
                            id="cropsinfo"
                            label="작물 종류"
                            name="cropsinfo"
                            autoComplete="cropsinfo"
                            autoFocus
                            onChange={(e) => { setCropsinfo(e.target.value) }}  //

                        />

                        <Grid container spacing={0} >
                            <Grid item xs={4} >
                                <TextField
                                    margin="normal"
                                    required
                                    id="size"
                                    label="농지 면적(평)"
                                    name="size"
                                    autoComplete="size"

                                    autoFocus
                                    onChange={(e) => { setSize(e.target.value) }}  //

                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Box >
                                    산출가격: {size*30} 원 평수 x 30원 예정
                                </Box>
                            </Grid>
                        </Grid>



                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline // 크게만들어줌
                            rows={4}    // 크게만들어줌
                            name="requestContent"
                            label="요청내용"
                            id="requestContent"
                            autoComplete="current-password"
                            onChange={(e) => { setContent(e.target.value) }}

                        />

                        <Box >최종 결제 금액 : {size*30} 원</Box>

                        <Box justifyContent={"center"}>

                            <Button
                               // type="submit" // submit 버튼은 페이지를 새로고침해버린다
                                type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                                size="large"
                                variant="contained"


                              //  href="/service"
                                //sx={{ mt: 5, mb: 4 }}
                                onClick={() => {
                                    postCustomerRequest( address, requestContent, reservationDate,cropsinfo,size)   //자택주소 1,2 작물종류 농지 면적 추가하기
                                    // 나중에 리팩터링하면서 적절한 응답 만들기
                                }}
                                sx={{ width: '20%', }}

                            >
                                결제하기
                            </Button>
                        </Box>

                    </Stack>
                </Box>
            </Container>
        </div>
    )
}