import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import scss from './Dashboard.module.scss';

const Dashboard = () => {
    return (
        <Box>
            <Grid container gap={2} className={scss.topCardsContainer}>
                <Grid xs={4}>
                    <Paper className={scss.dataCard}>xs=4</Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper className={scss.dataCard}>xs=4</Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper className={scss.dataCard}>xs=4</Paper>
                </Grid>
            </Grid>
            <Grid xs={12} marginY={2}>
                <Paper className={scss.dataCard}>xs=12</Paper>
            </Grid>
        </Box>
    );
};

export default Dashboard;
