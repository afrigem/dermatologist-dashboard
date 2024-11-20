import { Box } from "@mui/material";
import React from "react";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import ConsultationsPerDay from "@/components/Dashboard/ConsultationsPerDay";

const Dashboard = () => {
    return (
        <Box>
            <DataRibbon />
            <ConsultationsPerDay />
            {/*Transaction Dougnut Chart*/}
        </Box>
    );
};

export default Dashboard;
