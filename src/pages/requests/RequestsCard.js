import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { requestsRoute } from '../../components/backend';

// 방제 신청 정보 요청
const fetchRequestsData = async (setData) => {
    try {
        const response = await fetch(requestsRoute);
        const data = await response.json();
        const formattedData = data.map(item => ({
            orderid: item.orderid,
            address: item.address.jibunAddress,
            cropsinfo: item.cropsinfo,
            size: item.size,
            reservationDate: new Date(item.reservationDate),
        }));
        setData(formattedData);
    } catch (error) {
        console.error('', error);
    }
};

const formatDate = (date) => {
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};

// 방제 신청 정보 카드
const RequestCard = ({ item }) => (
    
    <Card sx={{
        height: '400px',
        minHeight: '250px',
        border: '1px solid black',
        borderRadius: '30px',
        }}>
        <CardContent>
            <Typography mt={2}
            sx={{         //줄바꿈 밀림 방지
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' 
                }}>
            {item.address}
            </Typography>
            <Typography mt={3}>{item.cropsinfo}</Typography>
            <Typography mt={3}>{item.size}</Typography>
            <Typography mt={3} >{formatDate(item.reservationDate)}</Typography> 
            <Button variant="contained" color="primary" sx={{ marginTop: '100px' }}>
                자세히 보기
            </Button>
        </CardContent>
    </Card>
);

// 방제 신청 정보 카드 목록
export function RequestsCard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchRequestsData(setData);
    }, []);

    return (
        <Grid container spacing={3}>
            {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <RequestCard item={item} />
                </Grid>
            ))}
        </Grid>
    );
}