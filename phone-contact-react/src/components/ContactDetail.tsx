import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { Contact } from "../types/Contact";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ContactDetail({
  editingContact,
  open,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: {
  editingContact: Contact | null;
  open: boolean;
  onClose: any;
  onCreate: any;
  onUpdate: any;
  onDelete: any;
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!editingContact) return;
    setPhone(editingContact?.phone);
    setName(editingContact?.name);
  }, [editingContact]);

  const clearFields = () => {
    setName("");
    setPhone("");
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        clearFields();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "grey.600",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <PersonIcon sx={{ color: "white" }} />
          </Box>

          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button
            variant="contained"
            onClick={() => {
              if (!name || !phone) return;
              editingContact
                ? onUpdate({
                    name,
                    phone,
                    id: editingContact.id,
                  })
                : onCreate({
                    name,
                    phone,
                  });
              clearFields();
            }}
          >
            Save
          </Button>
          {editingContact ? (
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                onDelete(editingContact);
                clearFields();
              }}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              clearFields();
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ContactDetail;
