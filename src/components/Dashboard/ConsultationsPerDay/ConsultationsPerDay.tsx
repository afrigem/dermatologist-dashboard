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
                    <Typography>Annual Consultations</Typography>
                    <DataChart type={"line"} data={lineChartData} />
                </div>
                <div className={scss.cardWrapper}>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography fontWeight={"bold"}>
                                Total Annual Consultations
                            </Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography color={"lightslategrey"} fontWeight={"bold"}>
                                784
                            </Typography>
                            <Typography color={theme.palette.success.main} fontSize={14}>
                                97.5%
                            </Typography>
                        </div>
                    </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography fontWeight={"bold"}>
                                Total Consultation Revenue p.a.
                            </Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography color={"lightslategrey"} fontWeight={"bold"}>
                                $ 797.33
                            </Typography>
                            <Typography color={theme.palette.success.main} fontSize={14}>
                                97.5%
                            </Typography>
                        </div>
                    </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography fontWeight={"bold"}>
                                Cancelled Consultations & Value p.a.
                            </Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography color={"lightslategrey"} fontWeight={"bold"}>
                                20
                            </Typography>
                            <Typography color={theme.palette.error.main} fontSize={14}>
                                $ 20.34
                            </Typography>
                        </div>
                    </Card>
                </div>
            </Paper>
        </Grid>
    );
};

export default ConsultationsPerDay;