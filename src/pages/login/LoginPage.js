import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import img from '../../assets/img/dronefield_bg.jpg'
import { useEffect, useState } from "react";
import { LogoButton } from "../../components/LogoButton";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../components/login_fuc";
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
                <CssBaseline />
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
                        height: '50vh',  
                    }}
                >
                    <Box mt={4}>
                        <LogoButton />
                    </Box>
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="email"
                            //label="이메일주소"
                            placeholder="이메일을 입력해주세요."
                            sx={{ margin: 'auto', width: '75%', marginBottom: '8px' }}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value); }}
                            InputProps={{ 
                                style: {borderRadius: '30px', backgroundColor: '#ffffff', height: '4vh'},
                            
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            sx={{ margin: 'auto', width: '75%', }}
                            //label="Password"
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{ 
                                style: {borderRadius: '30px', backgroundColor: '#ffffff', height: '4vh'},
                            }}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius: '8px', backgroundColor: '#999191', width: '70%',
                                '&:hover': { backgroundColor: '#999191'}
                             }}
                            onClick={() => {
                                logIn(userEmail, password)
                            }}
                        >
                            로그인
                        </Button>                       
                        <Button 
                                type="button"
                                href="/register"
                                variant="body2"
                                sx={{ 
                                    borderRadius: '8px', 
                                    backgroundColor: '#ffffff',
                                    marginTop: '-10px',
                                    boxShadow: '0px 0px 0px 0px',
                                    width: '70%',
                                    '&:hover': { backgroundColor: '#ffffff'}
                                }}
                                >
                                    회원가입
                                </Button>
                                <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" sx={{ color: '#65558f'}}>
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                        </Grid>
                </Box>
            </Container>
        </div>
    )
}


