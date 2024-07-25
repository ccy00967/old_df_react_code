import { Box, Button, Container, CssBaseline, Stack, TextField, Typography,Grid, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { server } from "../../components/login_fuc";
import { useDaumPostcodePopup } from "react-daum-postcode";

const postCustomerRequest = async function (userInfo, address, requestContent, reservationDate) {

    await fetch(server + "customer-requests/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + userInfo.access,
        },
        body: JSON.stringify({
            address: address,
            requestContent: requestContent,
            reservationDate: reservationDate,
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });

    //console.log(customerRequests);
    //return customerRequests;
}

export function ServiceRequestPage() {

    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
        console.log(data);
        setAddress(data.address);
    };

    const handleClick = (e) => {
        open({ onComplete: handleComplete });
        e.preventDefault();
    };

    const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트


    const [address, setAddress] = useState('');
    const [requestContent, setContent] = useState('');
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
            <Container component="main" maxWidth="sm">
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
                        <Box sx={{height:'40'}}></Box>
                        <Typography component="h1" variant="h4">
                            방제 신청서 작성
                        </Typography>

                        <Container ></Container>

                        <TextField
                            margin="normal"
                            fullWidth
                            id="address"
                            label="방제 주소"
                            name="address"
                            autoComplete="address"
                            autoFocus
                            onChange={(e) => { setAddress(e.target.value);}}
                        />

                        <Button variant="contained" onClick={handleClick} > 주소찾기 </Button>

                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="information1"
                            label="자택 주소 자세한 정보1"
                            name="information1"
                            autoComplete="information1"
                            autoFocus
                            onChange={(e) => { setAddress(e.target.value); }}
                            sx={{width:'50%'}}
                            
                        />
                         <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="information2"
                            label="자택 주소 자세한 정보2"
                            name="information2"
                            autoComplete="information2"
                            autoFocus
                            onChange={(e) => { setAddress(e.target.value); }}
                            sx={{width:'50%'}}
                           
                        />
                        
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
                        id = "type"
                        label="작물 종류"
                        name="type"
                        autoComplete="type"
                        autoFocus
                        onChange={(e) => { setAddress(e.target.value) }}
                        
                        />

                        <Grid container spacing={0} sx={{}}>
                        <Grid item xs={4} >
                        <TextField
                        margin="normal"
                        required
                        id = "area"
                        label="농지 면적(평)"
                        name="area"
                        autoComplete="area"
                        
                        autoFocus
                        onChange={(e) => { setAddress(e.target.value) }}
                        
                        />
                        </Grid>
                        <Grid item xs={8}>
                            <Box >
                                산출가격: 100,000,000 원 평수 x 30원 예정
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

                       <Box >최종 결제 금액 : xxxx 원</Box>
                        <Box justifyContent={"center"}>                      
                              <Button
                            type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            //type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            size="large"
                            variant="contained"
                            
                            
                            href="/service"
                            //sx={{ mt: 5, mb: 4 }}
                            onClick={() => {
                                postCustomerRequest(userInfo, address, requestContent, reservationDate)   //자택주소 1,2 작물종류 농지 면적 추가하기
                                // 나중에 리팩터링하면서 적절한 응답 만들기
                            }}
                            sx={{width: '20%',}}
                           
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