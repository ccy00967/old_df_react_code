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
import { server } from '../../components/login_fuc';

const getCustomerRequests = async function (userInfo, getRequests) {
    let length = 0;
    let customerRequests = []
    await fetch(server + "customer-requests/", {
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
            getRequests(data)
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

    const [customerRequests, getRequests] = useState([]);

    // useState(getCustomerRequests(userInfo));
    //console.log(customerRequests)
    useEffect(() => {
        if ((!userInfo.success)) {
            navigate("/login");
        }
        getCustomerRequests(userInfo, getRequests);
    }, []) // 무한로딩 방지용 [] 추가 - 여기안에 들어가는 값을 이전값과 비교후 변화유무에 따라 새로고침한다

    //console.log(customerRequests)
    //console.log(customerRequests.length)

    return (
        <div>
            <Button
                //type="submit" // submit 버튼은 페이지를 새로고침해버린다
                type="button" // 페이지를 새로고침하지 않는다 - 개발할때 console확인은 이걸로 하기

                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                href='/requestform'
            >
                서비스 신청 작성
            </Button>
            <Box height={100}>컴포넌트 사이에 넣을 패딩역할</Box>


            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {customerRequests.map((value) => (
                            <Grid key={value.id} item>
                                <Card sx={{ minWidth: 275 }}>
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
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}