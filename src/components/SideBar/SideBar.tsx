import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { getRandomKey } from "../utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { DialogContentText } from "@mui/material";

export const SideBar = ({
  setSidebarProp,
}: {
  setSidebarProp: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);

  useEffect(() => {
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
  }, [localStorage]);

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

  const deletePrompt = (key: string) => {
    localStorage.removeItem(key);
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
  };

  const handleSidebarClick = (value: string) => {
    setSidebarProp(value); // call setSidebarProp function with the new value
  };

  return (
    <div className="flex flex-col items-center">
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
        Add Prompt
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-multiline-flexible"
            label="Enter Your Prompt"
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
      <ul className="flex flex-col">
        {usedPrompts.map((prompt, index) => (
          <div className="flex flex-row">
            <button
              key={index}
              className="text-center mt-5 rounded hover:bg-[#14c498] p-2 w-60 truncate"
              onClick={() => handleSidebarClick(prompt)}
            >
              {prompt}
            </button>
            <button
              className="mt-5 mr-2"
              onClick={() => deletePrompt(localStorage.key(index)!)}
            >
              <AiTwotoneDelete className="hover:text-gray-600" />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
