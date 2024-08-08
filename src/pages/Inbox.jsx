
import { useNavigate } from "react-router-dom";
import { Typography, Divider, Card, CardContent, Grid, CardActionArea } from "@mui/material";

function Inbox({ data }) {
  const navigate = useNavigate();

  if (!data) {
    return <Typography variant="h6">No data available</Typography>;
  }

  const unreadPolicies = data.filter(policy => !policy.readStatus);

  const handleCardClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  return (
    <div style={{ padding: "16px", width: "100%" ,  margin: "16px 0" }}>
      <Typography variant="h5" style={{ marginBottom: "16px", textAlign: "left" }}>
        Inbox
      </Typography>
      <Divider style={{ marginBottom: "16px", width: "100%" }} />
      <Grid container direction="column" spacing={2} alignItems="flex-start">
        {unreadPolicies.map((policy) => (
          <Grid item key={policy.id}>
            <Card variant="outlined" style={{ minWidth: "300px" }}>
              <CardActionArea onClick={() => handleCardClick(policy.id)}>
                <CardContent>
                  <Typography variant="h6">
                    {policy.name}
                  </Typography>
                  <Typography color="textSecondary">{policy.dateCreated}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Inbox;
