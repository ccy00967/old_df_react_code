import { Box, Button, Container, TextField, Typography, Stack, Grid, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, handleEmailChange, handleEmailVerification, handleVerificationCodeSubmit, GenderToggleButton, NationToggleButton, handleVerificationCodeChange, RegisterComponent } from "../../pages/register/register_fuc";
import { setEmail, setPassword, setNickname, setName, setPhonenumber, setBirth } from '../../state/registration';

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AccountCircle, PhoneIphone, Person, Email, Lock, PermContactCalendar, Badge, CalendarToday } from '@mui/icons-material';
import dayjs from "dayjs";
import { NaverMaps } from "../../components/naver_maps/NaverMaps";

export function RegisterPage() {

    //const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트
    const userEmail = useSelector(state => state.registration.userEmail);

    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    return (
        <div>
            {/* <Container component="main" sx={{ width: '40%', minWidth: '500px' }}> */}
            <Container component="main" maxWidth="md">

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
                                //value={userEmail}
                                onChange={(e) => handleEmailChange(e, dispatch, setEmailError)}
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
                                    width: '150px',
                                    height: '40px',
                                    textAlign: 'center',  // 텍스트가 가운데 정렬되도록 설정
                                    padding: '0',  // 패딩을 없애서 크기 고정
                                    lineHeight: 'normal',  // 텍스트의 줄 높이를 조정
                                }}
                                onClick={() => handleEmailVerification(userEmail, setShowVerification)}
                            >
                                이메일 인증하기
                            </Button>
                        </Grid>
                    </Grid>
                    {showVerification && (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                < RegisterComponent />
                            </Grid>
                        </Grid>
                    )}

                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        required
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력해 주세요."
                        margin="dense"
                        onChange={(e) => dispatch(setPassword(e.target.value))}
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
                        <GenderToggleButton />

                        <NationToggleButton />
                    </Box>

                    <TextField
                        margin="normal"
                        required // 이걸 지우면 *표시가 사라짐
                        id="nickname"
                        label="닉네임"
                        name="nickname"
                        autoComplete="nickname"
                        placeholder="닉네임 입력"
                        onChange={(e) => dispatch(setNickname(e.target.value))}
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
                            placeholder="사용자 성함을 입력해 주세요."
                            onChange={(e) => dispatch(setName(e.target.value))}
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
                            onChange={(e) => dispatch(setPhonenumber(e.target.value))}
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
                            onChange={(newValue) => dispatch(setBirth(dayjs(newValue).format('YYYY-MM-DD')))
                                //setDate(dayjs(value).format('YYYY-MM-DDTHH:mm:ss'))
                                //console.log(reservationDate)
                            }
                        />
                    </LocalizationProvider>
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="birth"
                        label="생년월일 8자리"
                        id="birth"
                        placeholder="생년월일 8자리를 입력해주세요."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarToday />
                                </InputAdornment>
                            ),
                        }}
                    /> */}

                    <NaverMaps />


                    <Button
                        //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                        type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                        variant="contained"
                        size="large"
                        disableElevation
                        onClick={() => register()}
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


