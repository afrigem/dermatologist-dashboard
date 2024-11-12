import React from "react";
import {Avatar} from "@mui/material";
import { useSession} from "next-auth/react";

const Header = () => {
    const { data: session } = useSession();
    const userProfileImg = session?.user?.image as string;
    return (
        <>
            <h1>Header</h1>
            <Avatar alt={session?.user?.name as string} src={userProfileImg} />        
        </>
        
    )
}

export default Header;