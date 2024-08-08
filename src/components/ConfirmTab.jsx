import { Button, Checkbox } from "@mui/material";

function ConfirmTab({
  handleSubmitDisabled,
  submitDisabled,
  handleSubmit,
  policy,
}) {
  return (
    <div
      className="pdf-controls-container"
      style={{ position: "absolute", bottom: 0, opacity: 0.8 }}
    >
      <div className="pdf-controls">
        <Checkbox
          color="default"
          size="large"
          style={{ color: "#616161" }}
          onClick={handleSubmitDisabled}
        />
        <p
          style={{
            fontWeight: "500",
            marginRight: "1em",
            color: "white",
            alignSelf: "center",
          }}
        >
          I have read the policies
        </p>
        <Button
          variant="outlined"
          size="medium"
          disabled={submitDisabled}
          onClick={() => handleSubmit(policy.id, policy)}
          style={{ color: "white", borderColor: "#616161", padding: "10px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ConfirmTab;
