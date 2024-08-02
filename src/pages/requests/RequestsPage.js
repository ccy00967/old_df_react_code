import { Box, Container, Grid, } from "@mui/material";
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
            <Box height="130px" />

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