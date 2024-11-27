import { IconButton, Paper, Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import React from "react";
import scss from './DataCard.module.scss';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export type DataCardProps = {
    title: string;
    value: string;
    description: string;
};

const DataCard = (props: DataCardProps) => {
    const { title, value, description } = props;
    return (
        <Paper className={scss.dataCard}>
            <div className={scss.header}>
                <Typography fontSize={"h6"} color={"lightslategrey"}>
                    {title}
                </Typography>
                <Tooltip
                title={
                    <Typography
                    fontSize={16}
                    >{`${description} ${value}`}</Typography>
                }
            >
                <IconButton>
                    <InfoOutlinedIcon />
                </IconButton>
            </Tooltip>
            </div>
            <Typography fontSize={"h4"}>{value}</Typography>
        </Paper>
    )
};

export default DataCard;