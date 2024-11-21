import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
    const { data: session } = useSession();

    return (
        <>
            <h1>Profile</h1>
            <Box>
                <Typography variant={"h4"} sx={{ paddingBottom: 4 }}>
                    Hey {session ? session?.user?.name : "User"}, welcome to your profile.
                </Typography>
            </Box>
        </>
    );
};

export default Profile;