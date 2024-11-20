import React from "react";
import scss from "./ConsultationsPerDay.module.scss";
import { useTheme } from "@mui/system";
import { Card, Grid, Paper, Typography } from "@mui/material";
import DataChart from "@/components/DataChart";
import { lineChartData } from "@/components/mockData";


export type ConsultationsCardType = {
    title: string;
    value: string;
    changeValue: string;
};

const ConsultationsPerDay = () => {
    const theme = useTheme();

    return (
        <Grid container gap={2} className={scss.wrapper}>
            <Paper className={scss.consultations}>
                <div className={scss.chart}>
                    <Typography>Consultations Per Day</Typography>
                    <DataChart type={"line"} data={lineChartData} />
                </div>
                <div className={scss.cardWrapper}>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>Total Consultations</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>1.275</Typography>
                            <Typography color={theme.palette.success.main} fontSize={14}>
                                428.7%
                            </Typography>
                        </div>
                    </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>Buy-to-detail</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>4.40%</Typography>
                            <Typography color={theme.palette.success.main} fontSize={14}>
                                899.4%
                            </Typography>
                        </div>
                    </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>Refunds</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>0</Typography>
                            <Typography color={theme.palette.success.main} fontSize={14}>
                                0
                            </Typography>
                        </div>
                    </Card>
                </div>
            </Paper>
        </Grid>
    );
};

export default ConsultationsPerDay;