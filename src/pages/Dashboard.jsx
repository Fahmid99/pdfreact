import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function Dashboard({ policies, inbox }) {
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {/* Top Section: Policy Stats */}
        <Grid item xs={12}>
          <Typography variant="h5">Policy Statistics</Typography>
        </Grid>

        {/* Top Left: Inbox Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h6">Inbox</Typography>
            <List></List>
            <Button
              component={NavLink}
              to="/inbox"
              variant="contained"
              color="primary"
            >
              Go to Inbox
            </Button>
          </Paper>
        </Grid>

        {/* Bottom Row: Policy List Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h6">Policy List</Typography>
            <List></List>
            <Button
              component={NavLink}
              to="/policieslist"
              variant="contained"
              color="primary"
            >
              Go to Policies List
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
