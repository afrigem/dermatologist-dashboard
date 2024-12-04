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
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Wallet: React.FC = () => {
  const theme = useTheme();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch wallet data from the database
    axios
      .get("/api/wallet")
      .then((response) => setRows(response.data))
      .catch((error) => console.error("Error fetching wallet data:", error));
  }, []);

  const handleRequestPayment = () => {
    if (selectedRows.length > 0) {
      axios
        .put("/api/wallet/request-payment", {
          ids: selectedRows,
        })
        .then(() => {
          alert("Payment request sent.");
          setRows((prev) =>
            prev.map((row) =>
              selectedRows.includes(row.id)
                ? { ...row, payment_status: "Pending" }
                : row
            )
          );
          setOpenDialog(false);
        })
        .catch((error) =>
          console.error("Error requesting payment:", error)
        );
    }
  };

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Earnings");
    XLSX.writeFile(workbook, "earnings.csv");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Earnings Report", 10, 10);
    const data = rows.map(
      ({
        client_id,
        client_name,
        consultation_date,
        consultation_status,
        payment_status,
        payment_date,
        amount,
      }) => [
        client_id,
        client_name,
        consultation_date,
        consultation_status,
        payment_status,
        payment_date,
        `$${amount}`,
      ]
    );
    doc.autoTable({
      head: [
        [
          "Client ID",
          "Client Name",
          "Consultation Date",
          "Consultation Status",
          "Payment Status",
          "Payment Date",
          "Amount",
        ],
      ],
      body: data,
    });
    doc.save("earnings.pdf");
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
        Wallet
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
          onSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection as string[])
          }
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "1rem" }}
        onClick={handleRequestPayment}
        disabled={selectedRows.length === 0}
      >
        Request Payment
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ margin: "1rem" }}
        onClick={handleExportCSV}
      >
        Export CSV
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ margin: "1rem" }}
        onClick={handleExportPDF}
      >
        Export PDF
      </Button>
    </Box>
  );
};

export default Wallet;
