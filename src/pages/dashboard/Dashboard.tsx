import { Box, Grid } from "@mui/material";
import React from "react";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import ConsultationsPerDay from "@/components/Dashboard/ConsultationsPerDay";
import ConsultationBottomRow from "@/components/Dashboard/ConsultationBottomRow";

const Dashboard = () => {
    return (
        <Box>
            <Grid container gap={4} marginTop={2}>
                <DataRibbon />
                <ConsultationsPerDay />
            </Grid>
            <ConsultationBottomRow />
        </Box>
    );
};

export default Dashboard;
