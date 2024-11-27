import DataCard from "../DataCard/DataCard";
import React from "./index";
import { Grid } from "@mui/material";
import scss from "./DataRibbon.module.scss";

const DataRibbon = () => {
    return (
        <Grid container gap={2} className={scss.dataRibbon}>
            <Grid>
                <DataCard
                    title={"Upcoming Consultations"}
                    value={"10"}
                    description={
                        "Upcoming Consultations are"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Total Consultations (p/m)"}
                    value={"30"}
                    description={
                        "Total virtual consultations this month are"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Income (p/m)"}
                    value={"$ 900.00"}
                    description={
                        "The Total Revenue made this month is"}
                />
            </Grid>
            <Grid>
                <DataCard
                    title={"Brand Products Sales (p/a)"}
                    value={"$ 1000.00"}
                    description={
                        "The Total Income from Brand Products recomm. comm."}
                />
            </Grid>            
        </Grid>
    );
};

export default DataRibbon;