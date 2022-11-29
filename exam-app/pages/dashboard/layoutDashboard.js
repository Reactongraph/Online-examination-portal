import * as React from "react";
import Sidebar from "./sidebar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function LayoutDashboard({ children }) {
  return (
    <>
      <Grid container>
        <Grid item>
          {/* <Sidebar /> */}
        </Grid>
        <Divider flexItem>
          <br></br>
        </Divider>

        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
