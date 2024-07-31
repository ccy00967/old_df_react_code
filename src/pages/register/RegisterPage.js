import { Box, Button, Container, TextField, Typography, Stack, Grid, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment,ToggleButton, ToggleButtonGroup  } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../pages/login/login_fuc";
import MapComponent from '../../components/MapComponents';
import { setEmail, setPassword, setName, handleOpen, handleClose } from '../../state/UserSlice';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AccountCircle, PhoneIphone, Person, Email, Lock, PermContactCalendar, Badge } from '@mui/icons-material';
import dayjs from "dayjs";


const handleVerificationCodeSubmit = async (verificationCode) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/validatekeycheck', {
            method: 'POST',
            mode: 'cors',
            headers: [["Content-Type", 'application/x-www-form-urlencoded',]],
            body: new URLSearchParams({ validatekey: verificationCode }),
            credentials: "include",
        });

        if (response.ok) {
            alert('이메일 인증에 성공했습니다.');
        } else {
            console.error('Error verifying email:', response.statusText);
            alert('인증번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        alert('인증번호가 일치하지 않습니다.');
    }
};

const handleVerificationCodeChange = (e, setVerificationCode) => {
    setVerificationCode(e.target.value);
};

const handleEmailChange = (e, dispatch, setEmailError) => {
    const value = e.target.value;
    dispatch(setEmail(value));

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
        setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
        setEmailError('');
    }
};

const handleEmailVerification = async (userEmail, setShowVerification) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/emailsend', {
            method: 'POST',

            headers: [["Content-Type", 'application/x-www-form-urlencoded'],
            // ["Access-Control-Allow-Origin", "*"],
            ["Access-Control-Allow-Credentials", 'true'],
            ],
            credentials: "include",
            body: new URLSearchParams({ email: userEmail }),
        })
            ;


        if (response.ok) {
            setShowVerification(true);
        } else {
            console.error('Error sending email verification:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending email verification:', error);
    }
};

const App = () => {
    return (
        <div className="App">
            <h1>네이버 지도 테스트</h1>
            <MapComponent />
        </div>
    );
}; // 네이버 맵컴포넌트 연결

export default App;

export function RegisterPage() {

    //const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트

    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.user.userEmail);
    const password = useSelector((state) => state.user.password);
    const userName = useSelector((state) => state.user.userName);

    const [emailError, setEmailError] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    return (
        <div>
            <Container component="main" sx={{ width: '40%', minWidth: '500px' }}>

                <Box height="130px" />

                <Stack spacing={5}>

                    <Typography variant="h4">회원가입</Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일주소"
                                name="email"
                                autoComplete="email"
                                placeholder="이메일을 입력해 주세요."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                size="large"
                                disableElevation
                                sx={{
                                    width: '150px',  // 원하는 너비로 조정
                                    height: '40px',  // 원하는 높이로 조정
                                    textAlign: 'center',  // 텍스트가 가운데 정렬되도록 설정
                                    padding: '0',  // 패딩을 없애서 크기 고정
                                    lineHeight: 'normal',  // 텍스트의 줄 높이를 조정
                                }}
                            >
                                이메일 인증하기
                            </Button>
                        </Grid>
                    </Grid>

                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        required
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력해 주세요."
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        margin="normal"
                        required
                        fullWidth
                        name="password confirm"
                        label="비밀번호 확인"
                        type="password"
                        id="password confirm"
                        placeholder="비밀번호를 다시 입력해주세요."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ display: 'flex', width: '100%', maxHeight: '40px', minWidth: '50px' }}>
                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        aria-label="Platform"
                        fullWidth
                    >
                        <ToggleButton value="male">남자</ToggleButton>
                        <ToggleButton value="Female">여자</ToggleButton>
                    </ToggleButtonGroup>


                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        aria-label="Platform"
                        fullWidth
                    >
                        <ToggleButton value="local">내국인</ToggleButton>
                        <ToggleButton value="foreigner">외국인</ToggleButton>
                    </ToggleButtonGroup>
                    </Box>

                    <TextField
                        margin="normal"
                        required // 이걸 지우면 *표시가 사라짐
                        id="nickname"
                        label="닉네임"
                        name="nickname"
                        autoComplete="nickname"
                        placeholder="닉네임 입력"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Badge />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ m: 1, width: '40%' }}
                    />

                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            id="name"
                            label="이름"
                            name="name"
                            autoComplete="name"
                            placeholder="이름을 입력해 주세요."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: '45%' }}
                        />

                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            id="phonenumber"
                            label="전화번호"
                            name="phonenumber"
                            autoComplete="phonenumber"
                            placeholder="전화번호를 입력해 주세요."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIphone />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ ml: 1, width: '45%' }}
                        />
                    </Box>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko" >
                        <DatePicker
                            label="생년월일 입력"

                            //value={reservationDate}
                            onChange={(value) => {
                                //setDate(dayjs(value).format('YYYY-MM-DD'))
                                //console.log(reservationDate)
                            }}
                        />
                    </LocalizationProvider>

                    <div className="MapApp">
                        <MapComponent />
                    </div>

                    <Button
                        //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                        type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                        variant="contained"
                        size="large"
                        disableElevation
                    //sx={{ m: 1, width: '25%' }}
                    >
                        회원 가입
                    </Button>
                    <Box height="100px"></Box>
                </Stack>
            </Container>
            {/* <Modal
                open={open ? true : false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {userData.success ? "Success" : "Error"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {userData.success ? userData.message : userData.email}
                    </Typography>
                </Box>
            </Modal> */}
        </div >
    )
}

/*
 {showVerification && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="verificationCode"
                                        label="인증번호"
                                        name="verificationCode"
                                        autoComplete="off"
                                        placeholder="인증번호를 입력해 주세요."
                                    />
                                </Box>
                                <Button
                                    type="button"
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                >
                                    인증번호 확인
                                </Button>
                            </Box>
                        )}
*/
