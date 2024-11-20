import { LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useDemoData } from "@mui/x-data-grid-generator";

const Appointments = () => {
    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 500,
        maxColumns: 15,
    });

    return (
        <>
            <h1>Data</h1>
            <p>The data below is for demo purposes</p>
            <div style={{ height: "900px", width: "100%" }}>
                <DataGrid
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={!data}
                    {...data}
                />
            </div>
        </>
    );
};

export default Appointments;