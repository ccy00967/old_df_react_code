import { Button, ButtonGroup, Grid } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { LogoButton } from "./LogoButton";
import { useSelector } from "react-redux";
import { logOut } from "./login_fuc";


export function CustomAppBar() {

    const userInfo = useSelector(state => { return state.persist.userInfo; });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" elevation={0} component="nav" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} >
                <Toolbar>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Box
                            //my={4}
                            display="flex"
                            alignItems="center"
                            gap={4}
                            p={2}
                        //sx={{ border: '2px solid grey' }}
                        >
                            <LogoButton />

                        </Box>
                        <Button href="/a" variant="text" xs={4}>소개</Button>
                        <Button href="/a" variant="text" xs={4}>연결 업체</Button>
                        <Button href="/a" variant="text" xs={4}>고객센터</Button>
                        <Button href="/service" variant="text" xs={4}>서비스 신청하기</Button>
                        {userInfo.success ? UserBriefInfoButton(userInfo) : LoginAndRegisterButton()}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box height={100}>앱바용 패딩효과를 주는 박스</Box>
        </Box>
    );
}

function LoginAndRegisterButton() {
    return (
        <ButtonGroup>
            <Button href="/login" variant="contained">로그인</Button>
            <Button href="/register" variant="outlined">회원가입</Button>
        </ButtonGroup>
    );
}

function UserBriefInfoButton(userInfo) {
    return (
        <Button
            variant="outlined"
            size="large"
            style={
                {
                    color: 'green',
                    //backgroundColor: 'green',
                    borderColor: 'green',
                }
            }
            onClick={async () => {
                await logOut() // 이놈을 사용할때는 onClick에 async를 달것!
            }}
        >
            {userInfo.authenticatedUser.email}
        </Button>
    );
}
