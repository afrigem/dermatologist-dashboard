import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers";

const Appointments: React.FC = () => {
  const theme = useTheme();

  const [rows] = useState<GridRowsProp>([
    { id: 1, client_id: "C001", client_name: "John Doe", client_email: "jdoe@gmail.com", appointment_date: "2024-12-01", appointment_status: "Scheduled" },
    { id: 2, client_id: "C002", client_name: "Jane Smith", client_email: "jsmith@gmail.com", appointment_date: "2024-12-02", appointment_status: "Completed" },
    { id: 3, client_id: "C003", client_name: "Alice Brown", client_email: "abrown@gmail.com", appointment_date: "2024-12-03", appointment_status: "Cancelled" },
  ]);

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleReschedule = (row: any) => {
    setSelectedRow(row);
    setOpenRescheduleDialog(true);
  };

  const handleCancel = (row: any) => {
    setSelectedRow(row);
    setOpenCancelDialog(true);
  };

  const confirmReschedule = () => {
    if (selectedDate && selectedRow) {
      console.log(`Rescheduling appointment for ${selectedRow.client_name} to ${selectedDate.toString()}`);
      alert(`Email sent to ${selectedRow.client_email} for reschedule.`);
    }
    setOpenRescheduleDialog(false);
  };

  const confirmCancelation = () => {
    if (selectedRow) {
      console.log(`Canceling appointment for ${selectedRow.client_name} with reason: ${cancelReason}`);
      alert(`Email sent to ${selectedRow.client_email} for cancelation.`);
    }
    setOpenCancelDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "client_id", headerName: "Client ID", width: 150 },
    { field: "client_name", headerName: "Client Name", width: 200 },
    { field: "client_email", headerName: "Client Email", width: 200 },
    { field: "appointment_date", headerName: "Appointment Date", width: 180 },
    { field: "appointment_status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleReschedule(params.row)}
          >
            Reschedule
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleCancel(params.row)}
          >
            Cancel
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          padding: "2rem",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}>
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

        {/* Reschedule Dialog */}
        <Dialog
          open={openRescheduleDialog}
          onClose={() => setOpenRescheduleDialog(false)}
        >
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <DateCalendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disablePast
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRescheduleDialog(false)}>Cancel</Button>
            <Button onClick={confirmReschedule} disabled={!selectedDate}>
              Confirm Reschedule
            </Button>
          </DialogActions>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
        >
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogContent>
            <TextField
              label="Reason for Cancelation"
              fullWidth
              multiline
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
            <Button onClick={confirmCancelation} disabled={!cancelReason}>
              Confirm Cancelation
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Appointments;
