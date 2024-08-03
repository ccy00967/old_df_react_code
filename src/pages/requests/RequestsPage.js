import { Box, Button, Container, Grid, } from "@mui/material";
import { RequestCard } from "./RequestCard";
import { requestsRoute } from '../../components/backend';
import { useEffect, useState } from "react";
import store from "../../state/store";

const fetchRequestsData = async function (setRequests) {

    await fetch(requestsRoute, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + store.getState().persist.userInfo.access,
        },
    })
        .then((res) => { return res.json(); })
        .then((data) => {
            setRequests(data)
        });
}


export function RequestsPage() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequestsData(setRequests);
    }, []);

    return (
        <Container component="main" maxWidth="md">
            <Box height="150px" />
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
            <Box height="50px" />
            <Grid container spacing={3}>
                {requests.map((request) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <RequestCard
                            //id={request.orderid}
                            key={request.orderid}
                            request={request}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box height="100px"></Box>
        </Container>
    );
};