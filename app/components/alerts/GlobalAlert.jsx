// components/alerts/GlobalAlert.jsx
import { Snackbar, Alert } from "@mui/material";

const GlobalAlert = ({ alert }) => {
  if (!alert) return null;

  return (
    <Snackbar open={alert.open} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert severity={alert.severity} variant="filled" sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
