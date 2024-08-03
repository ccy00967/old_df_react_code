import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut, server } from '../../pages/login/login_fuc';
import { dark } from '@mui/material/styles/createPalette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';

const getCustomerRequests = async function (userInfo, setcustomer) {
    let length = 0;
    let customerRequests = []
    await fetch("customer-requests/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + userInfo.access,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            length = data.length
            customerRequests = { ...data } // 왜인지 length가 사라져서 객체만 받아진다(...을 붙이면 객체를 한번 풀어서 넣는다)
            console.log(customerRequests)
            setcustomer(data)
        });

    //console.log(customerRequests);
    //return customerRequests;
}

const CustomerRequestForm = {
    address: "",
    ownerEmail: "",
    ownerName: "",
    requestContent: "",
    reservationDate: "",
}

export function ServicePage() {

    const userInfo = useSelector(state => { return state.persist.userInfo; });
    const navigate = useNavigate(); // 리액트 페이지 라우트

    const [customerRequests, setcustomer] = useState([]);

    // useState(getCustomerRequests(userInfo));
    //console.log(customerRequests)
    // useEffect(() => {
    // if ((!userInfo.success)) {
    //   navigate("/login");
    //    }
    //    getCustomerRequests(userInfo, getRequests);
    //  }, []) // 무한로딩 방지용 [] 추가 - 여기안에 들어가는 값을 이전값과 비교후 변화유무에 따라 새로고침한다

    //console.log(customerRequests)
    //console.log(customerRequests.length)

    return (

        <div>
            <Box sx={{ height: 130 }}></Box>

            <Grid container spacing={2}>

                <Grid item xs={3} >
                    <Stack
                        spacing={3}
                        sx={{ alignItems: 'center', borderRight: 1 }}>

                        <Box height={40}></Box>

                        <Typography>사용자 닉네임</Typography>
                        {/* <text>{userInfo.authenticatedUser.name}</text> */}
                        <Button
                            // type="submit" // submit 버튼은 페이지를 새로고침해버린다
                            type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기
                            variant="contained"
                            href='/requestform'
                            sx={{
                                width: '140px',
                                height: '35px',
                                textAlign: 'center',  // 텍스트가 가운데 정렬되도록 설정
                                padding: '0',  // 패딩을 없애서 크기 고정
                                lineHeight: 'normal',  // 텍스트의 줄 높이를 조정
                            }}
                        >
                            방제 신청
                        </Button>

                        <Button
                            type="button"
                            variant='contained'
                            href="/request"
                            sx={{
                                width: '140px',
                                height: '35px',
                                textAlign: 'center',
                                padding: '0',
                                lineHeight: 'normal',
                            }}>
                            신청서 현황
                        </Button>
                        <Typography>확인 대기목록</Typography>
                        <Typography>완료 내역</Typography>

                        <Button
                            variant="outlined"
                            href="/"
                            color="error"
                            onClick={async () => {
                                logOut() // 이놈을 사용할때는 onClick에 async를 달것!
                            }}
                        >
                            로그아웃
                        </Button>

                    </Stack>
                </Grid>


                <Grid item xs={9}>
                    <Grid
                        sx={{ flexGrow: 1, }}
                        container
                        spacing={2}>

                        <Grid item xs={12}>

                            <Grid
                                container
                                justifyContent="center"
                                spacing={10}>
                                {customerRequests.map((value) => (
                                    <Grid
                                        key={value.id}
                                        item>

                                        <Card
                                            sx={{
                                                minWidth: 275,
                                                height: 300,
                                                border: 1,
                                                borderRadius: '25px',
                                            }}>

                                            <Box
                                                sx={{
                                                    alignContent: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <CardContent>

                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {value.ownerName}
                                                    </Typography>

                                                    <Typography variant="h5" component="div">
                                                        {value.requestContent}
                                                    </Typography>

                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        {value.address}
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        {value.ownerEmail}
                                                        <br />
                                                        {value.reservationDate}
                                                    </Typography>

                                                </CardContent>

                                                <Box sx={{ height: '75px' }}></Box>

                                                <CardActions sx={{ justifyContent: "center", }}>

                                                    <Button
                                                        href='/detail'
                                                        variant="contained"
                                                    >자세히 보기</Button>
                                                </CardActions>

                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}