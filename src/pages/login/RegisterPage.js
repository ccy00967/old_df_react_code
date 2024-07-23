import { Box, Button, Container, CssBaseline, Grid, Link, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LogoButton } from "../../components/LogoButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../components/login_fuc";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function RegisterPage() {

    //const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트

    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setName] = useState('');
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // if (userInfo.success === true) {
        //     navigate("/");
        // }
        console.log(userData)
    }, [userData]);

    // const loginFormInit = {
    //     email: '',
    //     password: '',
    // }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LogoButton />

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="name"
                            label="이름"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => { setName(e.target.value); }}
                        />
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="email"
                            label="이메일주소"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value); }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            fullWidth
                            variant="contained"
                            //value="submit"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={async () => {
                                //logIn(userEmail, password)
                                setUserData(await register(userEmail, password, userName))
                                handleOpen();
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>



                    </Box>
                </Box>
            </Container>
            <Modal
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
            </Modal>
        </div>
    )
}

