import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";

export const ImportPrompt = ({
  handleAddPrompt,
}: {
  handleAddPrompt: (prompt: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleAddPrompt(prompt);
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
            onChange={(event) => setPrompt(event.target.value)}
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
