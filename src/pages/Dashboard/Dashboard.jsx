import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function Dashboard({ data }) {
  // Sample data for the mini preview table
  const policyPreviewData = [
    { name: "Policy 1", status: "Active" },
    { name: "Policy 2", status: "Pending" },
    { name: "Policy 3", status: "Inactive" },
    // ... more policies
  ];

  const sortedData = data.sort((a, b) =>
    b.dateCreated.localeCompare(a.dateCreated)
  );

  // Get the 3 latest entries
  const latestPolicies = sortedData.slice(0, 5);

  return (
    <div style={{ background: "#F8FAFC", height: "100vh" }}>
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {/* ... other components ... */}

          {/* Policy List Preview */}
          <Grid item xs={12} md={6}>
            <div
              style={{
                padding: "20px",
                border: "1px solid #E8E9ED",
                borderRadius: "15px",
                background: "white",
              }}
            >
              <Typography variant="h6">Recently Updated Policies</Typography>
              <TableContainer>
                <Table size="small" aria-label="policy preview table">
                  <TableHead>
                    <TableRow sx={{ background: "#eeeeee" }}>
                      <TableCell>Policy Name</TableCell>
                      <TableCell>Date Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestPolicies.map((policy) => (
                      <TableRow key={policy.name}>
                        <TableCell>{policy.name}</TableCell>
                        <TableCell>{policy.dateCreated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                component={NavLink}
                to="/policieslist"
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
              >
                See All Policies
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
