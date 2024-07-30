import { Box, Button, Container, CssBaseline, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import img from '../../assets/img/dronefield_bg.jpg'
import { useEffect, useState } from "react";
import { LogoButton } from "../../components/LogoButton";
import { useNavigate } from "react-router-dom";
import { logIn } from "./login_fuc";
import { useSelector } from "react-redux";




export function LoginPage() {

    const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트

    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userInfo.success === true) {
            navigate("/");
        }
    });

    // const loginFormInit = {
    //     email: '',
    //     password: '',
    // }

    return (
        <div style={{
            height: "100vh",
            backgroundColor: "green",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundPosition: 'center center',
                        backdropFilter: 'blur(4px)',
                        backgroundColor: '#ffffffbd',
                        borderRadius: '20px',
                        height: '450px',
                    }}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="space-evenly"
                        spacing={3}
                    >
                        <LogoButton />

                        <TextField
                            margin="normal"
                            id="email"
                            label="이메일 주소"
                            placeholder="이메일을 입력해주세요."
                            name="email"
                            autoComplete="email"
                            size="small"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value); }}

                        />

                        <TextField
                            margin="normal"
                            name="password"
                            label="비밀번호"
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            id="password"
                            size="small"
                            //autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}


                        <Button
                            //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            variant="contained"
                            fullWidth
                            onClick={() => {
                                logIn(userEmail, password)
                            }}
                        >
                            로그인
                        </Button>


                        <Button
                            type="button"
                            href="/register"
                            variant="outlined"
                            fullWidth
                        >
                            회원가입
                        </Button>

                        <Link href="/forgot" variant="body2" >
                            비밀번호 찾기
                        </Link>
                    </Stack>

                </Box>
            </Container>
        </div>
    )
}


