import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, useTheme } from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import styles from "./Wallet.module.scss";

const Wallet: React.FC = () => {
  const [rows] = useState<GridRowsProp>([
    { id: 1, client_id: "C001", client_name: "John Doe", consultation_date: "2024-11-28", consultation_status: "Completed", payment_status: "Paid", payment_date: "2024-11-29", amount: 200 },
    { id: 2, client_id: "C002", client_name: "Jane Smith", consultation_date: "2024-11-26", consultation_status: "Completed", payment_status: "Paid", payment_date: "2024-11-27", amount: 300 },
    { id: 3, client_id: "C003", client_name: "Alice Brown", consultation_date: "2024-11-25", consultation_status: "Completed", payment_status: "Paid", payment_date: "2024-11-26", amount: 150 },
  ]);

  const totalEarnings = rows.reduce((acc, row) => acc + row.amount, 0);
  const availableBalance = totalEarnings - 100; // Assume $100 is reserved

  const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Earnings");
    XLSX.writeFile(workbook, "earnings.csv");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Earnings Report", 10, 10);
    const data = rows.map(({ client_id, client_name, consultation_date, consultation_status, payment_status, payment_date, amount }) => [
      client_id,
      client_name,
      consultation_date,
      consultation_status,
      payment_status,
      payment_date,
      `$${amount}`,
    ]);
    doc.autoTable({
      head: [["Client ID", "Client Name", "Consultation Date", "Consultation Status", "Payment Status", "Payment Date", "Amount"]],
      body: data,
    });
    doc.save(`earnings.pdf`);
  };

  const handleRequestWithdrawal = () => {
    if (typeof withdrawalAmount === "string" || withdrawalAmount <= 0 || withdrawalAmount > availableBalance) {
      setErrorMessage("Transaction declined due to insufficient funds.");
    } else {
      setErrorMessage("");
      if (window.confirm(`Are you sure you want to withdraw $${withdrawalAmount}?`)) {
        alert("Withdrawal requested successfully.");
        setWithdrawalDialogOpen(false);
        setWithdrawalAmount("");
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "client_id", headerName: "Client ID", width: 120 },
    { field: "client_name", headerName: "Client Name", width: 200 },
    { field: "consultation_date", headerName: "Consultation Date", width: 180 },
    { field: "consultation_status", headerName: "Consultation Status", width: 180 },
    { field: "payment_status", headerName: "Payment Status", width: 150 },
    { field: "payment_date", headerName: "Payment Date", width: 180 },
    { field: "amount", headerName: "Amount ($)", width: 120 },
  ];

  // Get the current theme
  const theme = useTheme();

  // Define dynamic styles based on the theme
  const cardStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff", // Dark mode or light mode
    color: theme.palette.mode === "dark" ? "#fff" : "#000", // Text color
  };

  const buttonStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#ff5722" : "#6200ea", // Button color
    color: "#fff",
  };

  return (
    <div className={styles.walletContainer}>
      <h1 className={styles.title}>Wallet</h1>

      {/* Data Cards */}
      <div className={styles.cardContainer}>
        <div className={styles.card} style={cardStyle}>
          <h2>Total Earnings</h2>
          <p>${totalEarnings}</p>
        </div>
        <div className={styles.card} style={cardStyle}>
          <h2>Available Balance</h2>
          <p>${availableBalance}</p>
        </div>
      </div>

      {/* Earnings Table */}
      <div className={styles.tableContainer}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        <div className={styles.exportButtons}>
          <Button variant="contained" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="contained" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Withdrawal Button */}
      <div className={styles.withdrawButtonContainer}>
        <Button variant="contained" style={buttonStyle} onClick={() => setWithdrawalDialogOpen(true)}>
          Request Withdrawal
        </Button>
      </div>

      {/* Withdrawal Dialog */}
      <Dialog open={withdrawalDialogOpen} onClose={() => setWithdrawalDialogOpen(false)}>
        <DialogTitle>Request Withdrawal</DialogTitle>
        <DialogContent>
          <TextField
            label="Withdrawal Amount"
            type="number"
            fullWidth
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawalDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRequestWithdrawal} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Wallet;
