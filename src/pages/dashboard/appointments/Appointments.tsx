import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const Appointments: React.FC = () => {
  const theme = useTheme();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [completionNotes, setCompletionNotes] = useState("");

  useEffect(() => {
    // Fetch appointments from the database
    axios
      .get("/api/appointments")
      .then((response) => setRows(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleComplete = (row: any) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const confirmCompletion = () => {
    if (selectedRow) {
      axios
        .put(`/api/appointments/${selectedRow.id}/complete`, {
          notes: completionNotes,
        })
        .then(() => {
          alert("Appointment marked as completed.");
          setRows((prev) =>
            prev.map((row) =>
              row.id === selectedRow.id
                ? { ...row, appointment_status: "Completed" }
                : row
            )
          );
        })
        .catch((error) =>
          console.error("Error updating appointment status:", error)
        );
    }
    setOpenDialog(false);
    setCompletionNotes("");
  };

  const columns: GridColDef[] = [
    { field: "client_id", headerName: "Client ID", width: 150 },
    { field: "client_name", headerName: "Client Name", width: 200 },
    { field: "client_email", headerName: "Client Email", width: 200 },
    { field: "consultation_date", headerName: "Consultation Date", width: 180 },
    { field: "appointment_status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          {params.row.appointment_status === "Pending" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleComplete(params.row)}
            >
              Complete
            </Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}
      >
        Appointments
      </Typography>
      <Box
        sx={{
          height: 400,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </Box>

      {/* Completion Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Complete Consultation</DialogTitle>
        <DialogContent>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmCompletion}
            disabled={!completionNotes}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
