import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { FcImport } from "react-icons/fc";

export const APIKey = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    localStorage.setItem("api_key", key);
    const storedKey = localStorage.getItem("api_key") || "";
    setKey(storedKey);
    setOpen(false);
  };

  return (
    <div className="ml-2">
      <Button
        variant="contained"
        sx={{
          bgcolor: "#10A37F",
          "&:hover": {
            bgcolor: "#10C17F",
          },
        }}
        onClick={handleClickOpen}
        style={{ marginTop: "16px" }}
      >
        <FcImport />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-multiline-flexible"
            label="Enter your API key"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            onChange={(event) => setKey(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
