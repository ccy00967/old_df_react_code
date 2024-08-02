import { Box, Button, Container, TextField, Typography, Stack, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, handleEmailVerification, handleVerificationCodeSubmit } from "../../pages/register/register_fuc";
import { emailvalidateRoute } from "../../components/backend";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { NaverMaps } from "../../components/naver_maps/NaverMaps";

export function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('1');
    const [nationalinfo, setNationalinfo] = useState('0');


    const [emailError, setEmailError] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');


    // 이메일 형식 검증
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };


    // 국적 상태를 업데이트
    const nationUpdate = (event, nationchange) => {
        if (nationchange) {
            setNationalinfo(nationchange);
        }
    };

    // 성별 상태를 업데이트
    const genderUpdate = (event, genchange) => {
        if (genchange !== null) {
            setGender(genchange);
        }
    };


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
                                autoFocus
                                error={emailError}
                                onChange={handleEmailChange}
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
                                onClick={() => handleEmailVerification(email, setShowVerification)}
                                disabled={emailError}
                            >
                                이메일 인증하기
                            </Button>
                        </Grid>
                    </Grid>
                    {showVerification && (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="인증번호 입력"
                                    variant="outlined"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleVerificationCodeSubmit(verificationCode)}
                                >
                                    인증번호 확인
                                </Button>
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <TextField
                        sx={{ mt: 1, width: '75%' }}
                        margin="normal"
                        required
                        fullWidth
                        name="password confirm"
                        label="비밀번호 확인"
                        type="password"
                        id="password confirm"
                        placeholder="비밀번호를 다시 입력해주세요."
                    /> */}

                    <Box sx={{ display: 'flex', width: '100%', maxHeight: '40px', minWidth: '50px' }}>
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            value={gender} // 현재 성별 상태를 value로 설정
                            onChange={genderUpdate} // 변경 이벤트 핸들러를 설정
                            aria-label="Platform"
                            fullWidth
                        >
                            <ToggleButton value='1'>남자</ToggleButton>
                            <ToggleButton value='0'>여자</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            value={nationalinfo} // 현재 국적 상태를 value로 설정
                            onChange={nationUpdate}
                            aria-label="Platform"
                            fullWidth
                        >
                            <ToggleButton value='0'>내국인</ToggleButton>
                            <ToggleButton value='1'>외국인</ToggleButton>
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
                        onChange={(e) => setNickname(e.target.value)}
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setPhonenumber(e.target.value)}
                            sx={{ ml: 1, width: '45%' }}
                        />
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko" >
                        <DatePicker
                            label="생년월일 입력"
                            //value={reservationDate}
                            onChange={(newValue) => setBirth(dayjs(newValue).format('YYYY-MM-DD'))
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
                        onClick={() => register(password, nickname, name, phonenumber, birth, gender, nationalinfo)}
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


