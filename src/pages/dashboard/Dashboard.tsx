import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import scss from './Dashboard.module.scss';
import DataRibbon from "@/components/Dashboard/DataRibbon";

const Dashboard = () => {
    return (
        <Box>
            {/*Data Ribbon*/}
            <DataRibbon />
            {/*transaction per Day*/}
            {/*Transaction Dougnut Chart*/}
        </Box>
    );
};

export default Dashboard;
