import { Box, Button, Container, CssBaseline, Stack, TextField, Typography, Grid, Card, CardContent } from "@mui/material";
import { RequestsCard } from "./RequestsCard";

export function RequestsPage() {


    return (
        <Container component="main" maxWidth="md">
            <Box height="130px" /> 
            <Grid container spacing={3}>
            <RequestsCard />      
            </Grid>
      <Box height="100px"></Box>
        </Container>
    );
};