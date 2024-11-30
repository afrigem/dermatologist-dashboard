import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker } from "@mui/x-date-pickers";
import styles from "./Appointments.module.scss";

const Appointments: React.FC = () => {
  const [rows] = useState<GridRowsProp>([
    { id: 1, client_id: "C001", client_name: "John Doe", appointment_date: "2024-12-01", appointment_status: "Scheduled" },
    { id: 2, client_id: "C002", client_name: "Jane Smith", appointment_date: "2024-12-02", appointment_status: "Completed" },
    { id: 3, client_id: "C003", client_name: "Alice Brown", appointment_date: "2024-12-03", appointment_status: "Cancelled" },
  ]);

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Open Reschedule Dialog
  const handleReschedule = (row: any) => {
    setSelectedRow(row);
    setOpenRescheduleDialog(true);
  };

  // Open Cancel Dialog
  const handleCancel = (row: any) => {
    setSelectedRow(row);
    setOpenCancelDialog(true);
  };

  // Confirm Reschedule
  const confirmReschedule = () => {
    if (selectedDate && selectedRow) {
      // Logic to send email (replace with actual email API)
      console.log(`Rescheduling appointment for ${selectedRow.client_name} to ${selectedDate.toString()}`);
      alert(`Email sent to ${selectedRow.client_id}@example.com for reschedule.`);
    }
    setOpenRescheduleDialog(false);
  };

  // Confirm Cancelation
  const confirmCancelation = () => {
    if (selectedRow) {
      // Logic to send email (replace with actual email API)
      console.log(`Canceling appointment for ${selectedRow.client_name} with reason: ${cancelReason}`);
      alert(`Email sent to ${selectedRow.client_id}@example.com for cancelation.`);
    }
    setOpenCancelDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "client_id", headerName: "Client ID", width: 150 },
    { field: "client_name", headerName: "Client Name", width: 200 },
    { field: "appointment_date", headerName: "Appointment Date", width: 180 },
    { field: "appointment_status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div className={styles.actionButtons}>
          <button
            className={styles.rescheduleButton}
            onClick={() => handleReschedule(params.row)}
          >
            Reschedule
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => handleCancel(params.row)}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.appointmentsContainer}>
        <h1 className={styles.title}>Appointments</h1>
        <div className={styles.gridWrapper}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </div>

        {/* Reschedule Dialog */}
        <Dialog open={openRescheduleDialog} onClose={() => setOpenRescheduleDialog(false)}>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <CalendarPicker
              date={selectedDate}
              onChange={(date: React.SetStateAction<Date | null>) => setSelectedDate(date)}
              disablePast
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRescheduleDialog(false)}>Cancel</Button>
            <Button onClick={confirmReschedule} disabled={!selectedDate}>Confirm Reschedule</Button>
          </DialogActions>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
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
            <Button onClick={confirmCancelation} disabled={!cancelReason}>Confirm Cancelation</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default Appointments;