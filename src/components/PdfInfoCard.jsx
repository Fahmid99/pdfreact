import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

export default function IntroDivider({ policy }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 0,
        background: "323639",
        maxHeight: 200,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            {policy.name}{" "}
            {policy.readStatus ? (
              <Chip
                style={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "3px",
                  width: "100px",
                  marginLeft: "10px",
                }}
                label="Complete"
                size="small"
              />
            ) : (
              <Chip
                style={{
                  background: "#ef5350",
                  color: "white",
                  borderRadius: "3px",
                  width: "100px",
                  marginLeft: "10px",
                }}
                label="Incomplete"
                size="small"
              />
            )}
          </Typography>

          <Typography gutterBottom variant="h6" component="div">
            {policy.dateCreated}
          </Typography>
        </Stack>
        {/*         
        <Typography color="text.secondary" variant="body2">
          {policy.category}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Read Status
        </Typography>
        <Stack direction="row" spacing={1}>
          {policy.readStatus ? (
            <Chip color="primary" label="Complete" size="small" />
          ) : (
            <Chip color="error" label="Incomplete" size="small" />
          )}
        </Stack> */}
      </Box>
    </Card>
  );
}
