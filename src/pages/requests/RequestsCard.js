import { Box, Button, Container, CssBaseline, Stack, TextField, Typography, Grid, Card, CardContent } from "@mui/material";



export function RequestsCard() {

    const data = [
        { address: '방제 주소 1', type: '작물 종류 1', size: '방제 규모 1', period: '요청 기간 1' },
        { address: '방제 주소 2', type: '작물 종류 2', size: '방제 규모 2', period: '요청 기간 2' },
        { address: '방제 주소 3', type: '작물 종류 3', size: '방제 규모 3', period: '요청 기간 3' },
        { address: '방제 주소 4', type: '작물 종류 4', size: '방제 규모 4', period: '요청 기간 4' },
        { address: '방제 주소 5', type: '작물 종류 5', size: '방제 규모 5', period: '요청 기간 5' },
        { address: '방제 주소 6', type: '작물 종류 6', size: '방제 규모 6', period: '요청 기간 6' },
    ];

    return (
        <Grid container spacing={3}>
            {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card 
                    sx={{
                        height:'400px',
                        minHeight: '250px',
                        border: '1px solid black',
                        borderRadius: '30px',
                        }}>
                        <CardContent>
                            <Typography  mt={2}>{item.address}</Typography>
                            <Typography  mt={3}>{item.type}</Typography>
                            <Typography  mt={3}>{item.size}</Typography>
                            <Typography  mt={3}>{item.period}</Typography>
                            <Button variant="contained" color="primary" sx={{ marginTop: '100px' }}>
                                자세히 보기
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};