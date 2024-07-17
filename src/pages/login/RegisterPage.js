import { Box, Button, Container, CssBaseline, Grid, Link, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LogoButton } from "../../components/LogoButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../components/login_fuc";
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps'
import  RadioPositionEnd  from '../../components/RadioPositionEnd';
import  MapComponent  from '../../components/MapComponents';

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
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Box component="form" noValidate sx={{ mt: 1, maxWidth: '400px', margin: '0 auto'}}>
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="name"
                            label="이름"
                            name="name"
                            autoComplete="name"
                            placeholder="이름을 입력해 주세요."
                            autoFocus
                            onChange={(e) => { setName(e.target.value); }}
                            InputProps={{ 
                                style: {borderRadius: '20px',} ,
                            }}
                            sx={{
                                mb: 0,
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required // 이걸 지우면 *표시가 사라짐
                            fullWidth
                            id="email"
                            label="이메일주소"
                            name="email"
                            autoComplete="email"
                            placeholder="이메일 아이디를 입력해 주세요."
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value); }}
                            InputProps={{ 
                                style: {borderRadius: '20px'} ,
                            }}
                            sx={{
                                mb: 0,
                            }}                           
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해 주세요."
                            autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{ 
                                style: {borderRadius: '20px'} ,
                            }}
                        />
                        
                        <RadioPositionEnd />

                        <div className="App">
                            <h1>네이버 지도 테스트</h1>
                            <MapComponent />
                        </div>
                        <Button 
                            color="primary"
                            //href="/"  본인인증을 위한 페이지로 이동
                            variant="contained"
                            component="a"
                            size="small"
                            sx={{
                                width: '13vh',
                                height: '4vh',
                                backgroundColor: '#999191',
                                borderRadius: '15px',
                                fontSize: '1.5vh',
                                color: 'white',
                                transition: 'transform 0.3s ease-in-out', // 애니메이션 추가
                                '&:hover': {
                                    transform: 'translateY(-3px)', // 호버 시 위로 살짝 띄우기
                                    backgroundColor: '#999191' // 배경색 변경 방지
                                }
                            }}
                         >
                본인인증하기
            </Button>
                        <Button
                            //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            fullWidth
                            variant="contained"
                            //value="submit"
                            sx={{ mt: 3, mb: 2, borderRadius: '5px', backgroundColor: '#999191'}}
                            onClick={async () => {
                                //logIn(userEmail, password)
                                setUserData(await register(userEmail, password, userName))
                                handleOpen();
                            }}
                        >
                            회원 가입
                        </Button>


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

