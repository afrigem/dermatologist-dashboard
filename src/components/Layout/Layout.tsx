import SideMenu from "@/components/SideMenu";
import scss from "./Layout.module.scss";
import React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "@/components/Footer";


const Layout = (props: any) => {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Afrigem - Dermatologist's Dashboard</title>
                <meta name="description" content="Data Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/afrigem-logo.png" />
            </Head>
            <main
                className={scss.layout}
                style={{ padding: session ? "0 24px 0 80px" : 0 }}
            >
                {session && <SideMenu />}
                <div className={scss.content}>
                    {props.children}
                </div>
                <Footer />
        </main>
        </>
    );
};

export default Layout;