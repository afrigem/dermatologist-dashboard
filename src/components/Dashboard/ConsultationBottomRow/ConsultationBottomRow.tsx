import DataChart from "@/components/DataChart";
import { doughnutChartData } from "@/components/mockData";
import { Paper } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import scss from "./ConsultationBottomRow.module.scss";

const ConsultationBottomRow = () => {
    return (
        <Grid container className={scss.bottomRow}>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Income Chart</p>
                    <DataChart type={"doughnut"} data={doughnutChartData} />
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Income from Consultations</p>
                    <DataChart type={"doughnut"} data={doughnutChartData} />
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Income from Brand Recomm.</p>
                    <DataChart type={"doughnut"} data={doughnutChartData} />
                </Paper>
            </Grid>
            <Grid>
                <Paper className={scss.dataCard}>
                    <p>Consultations per user type</p>
                    <DataChart type={"doughnut"} data={doughnutChartData} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ConsultationBottomRow;