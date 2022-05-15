// pages/index.js
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import { createPost } from "../src/graphql/mutations";
import { listPosts } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";
import StickyHeadTable from "../components/table";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
Amplify.configure({ ...awsExports, ssr: true });

export default function Index() {
  async function logout(){
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Data SA table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          height: "300px",
          backgroundColor: "#85b1de",
          flexDirection: "row-reverse",
        }}
      >
        <Button color="error" style={{marginTop:'270px'}} onClick={logout} variant="contained">
          logout
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          {/* <Item>xs=8</Item> */}
        </Grid>
        <Grid item xs={8}>
          <StickyHeadTable></StickyHeadTable>
        </Grid>
        <Grid item xs={2}>
          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
      <div style={{ height: "300px", backgroundColor: "#85b1de" }}>
        this is a footer
      </div>
    </div>
  );
}
