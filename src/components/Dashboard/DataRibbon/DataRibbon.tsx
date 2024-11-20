import DataCard from "../DataCard/DataCard";
import React from "./index";
import { Grid } from "@mui/material";
import scss from "./DataRibbon.module.scss";

const DataRibbon = () => {
    return (
        <Grid container gap={2} className={scss.dataRibbon}>
            <Grid>
                <DataCard
                    title={"Total Consultations"}
                    value={"50"}
                    description={
                        "Total virtual consultations this month are"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Upcoming consultations"}
                    value={"5"}
                    description={
                        "Upcoming virtual consultations are"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Income"}
                    value={"$ 300.00"}
                    description={
                        "The Total Revenue made this month is"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Brand Products Sales"}
                    value={"$ 1000.00"}
                    description={
                        "The Total Sales from Brand Products sales"}
                />
            </Grid>            
        </Grid>
    );
};

export default DataRibbon;