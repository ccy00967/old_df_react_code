import { Button, ButtonGroup, Grid, } from "@mui/material";
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
            <AppBar
                position="fixed"
                sx={{

                    alignItems: 'center',
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}>
                <Toolbar
                    variant="regular"
                    sx={(theme) => ({
                        bgcolor: 'snow',
                        width: '1400px', height: '8vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        backdropFilter: 'blur(24px)',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}>
                    {

                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Box
                                //my={4}
                                display="flex"
                                alignItems="center"
                                gap={1}
                                p={1}
                            //sx={{ border: '2px solid grey' }}
                            >
                                <LogoButton />
                            </Box>
                            <Button href="/introduction" variant="text" xs={4} sx={{ fontSize: '1.5vh', color: '#65558f' }}>소개 페이지</Button>
                            <Button href="/a" variant="text" xs={4} sx={{ fontSize: '1.5vh', color: '#65558f' }}>연결 업체</Button>
                            <Button href="/aa" variant="text" xs={4} sx={{ fontSize: '1.5vh', color: '#65558f' }}>고객센터</Button>
                            {/* <Button href="/service" variant="text" xs={4}>서비스 신청하기</Button> */}
                            {userInfo.success ? UserBriefInfoButton(userInfo) : LoginAndRegisterButton()}

                        </Grid>}
                </Toolbar>
            </AppBar>
            {/* <Box height={100}>앱바용 패딩효과를 주는 박스</Box> */}
        </Box>
    );
}

function LoginAndRegisterButton() {
    return (
        <Box
            sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1.5,
                alignItems: 'center',
            }}
        >
            <Button
                color="primary"
                href="/login"
                variant="contained"
                component="a"
                size="big"
            >
                로그인
            </Button>
            <Button
                color="primary"
                href="/register"
                variant="outlined"
                component="a"
                size="big"
            >
                회원가입
            </Button>
        </Box>
    );
}

function UserBriefInfoButton(userInfo) {

    return (

        <Button

            variant="outlined"
            size="large"
            href="/"
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
