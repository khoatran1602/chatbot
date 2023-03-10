import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { getRandomKey } from "../utils";

export const ImportPrompt = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    localStorage.setItem(getRandomKey(1, 100).toString(), prompt);
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
    setOpen(false);
  };

  return (
    <>
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
        <FcAcceptDatabase />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-multiline-flexible"
            label="Enter your Prompt"
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
    </>
  );
};
