import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { server } from "../../components/login_fuc";

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
                        width: '100%',
                        marginTop: 10,
                        //display: 'flex',
                        //flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={3}>

                        <Typography component="h1" variant="h5">
                            신청서 작성
                        </Typography>

                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="address"
                            label="주소"
                            name="address"
                            autoComplete="address"
                            autoFocus
                            onChange={(e) => { setAddress(e.target.value); }}
                        />
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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="원하는 날짜 입력"
                                //value={reservationDate}
                                onChange={(value) => {
                                    setDate(dayjs(value).format('YYYY-MM-DDTHH:mm:ss'))
                                    //console.log(reservationDate)
                                }}
                            />
                        </LocalizationProvider>

                        <Button
                            type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            //type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            size="large"
                            variant="contained"
                            //sx={{ mt: 5, mb: 4 }}
                            onClick={() => {
                                postCustomerRequest(userInfo, address, requestContent, reservationDate)
                                // 나중에 리팩터링하면서 적절한 응답 만들기
                            }}
                        >
                            신청하기
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </div>
    )
}