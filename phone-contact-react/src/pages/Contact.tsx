import { Button, Fab, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import AddIcon from "@mui/icons-material/Add";
import { Contact as IContact } from "../types/Contact";
import { useEffect, useState } from "react";
import axios from "axios";

const sortContact = (arr: IContact[]) => {
  return arr.sort((a: any, b: any) => a.name.localeCompare(b.name));
};

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

function Contact() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<IContact | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("false");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/contacts`);
      setContacts(sortContact(res.data as []));
    } catch (error) {
      alert("Failed to fetch contacts");
    }
  };

  const onClose = (e: any) => {
    setOpen(false);
    setEditingContact(null);
  };

  const onCreate = async (contact: IContact) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/contacts`, contact);
      setContacts(sortContact([...contacts, res.data as IContact]));
      setOpen(false);
      setEditingContact(null);
      onTriggerToast("Created");
    } catch (error) {
      onTriggerToast("Failed to add contact");
    }
  };

  const onUpdate = async (contact: IContact) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/contacts/${contact.id}`, contact);
      const newContactList = [...contacts];
      const index = newContactList.findIndex((c) => c.id === contact.id);
      newContactList[index] = contact;
      setContacts([...newContactList]);
      setOpen(false);
      setEditingContact(null);
      onTriggerToast("updated");
    } catch (error) {
      onTriggerToast("Failed to update contact");
    }
  };
  const onDelete = async (contact: IContact) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/contacts/${contact.id}`);

      setContacts([...contacts.filter((c) => c.id !== contact.id)]);
      setOpen(false);
      setEditingContact(null);
      onTriggerToast("deleted");
    } catch (error) {
      console.log(error);
      onTriggerToast("Failed to delete contact");
    }
  };

  const onTriggerToast = (message: string) => {
    setToastMessage(message);
    setOpenToast(true);
    setTimeout(() => setOpenToast(false), 2000);
  };

  return (
    <>
      <Box>
        <ContactList
          contactList={contacts}
          onSelect={(contact: IContact) => {
            setEditingContact({ ...contact });
            setOpen(true);
          }}
        />
      </Box>
      <ContactDetail editingContact={editingContact} open={open} onClose={onClose} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} />
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <Snackbar open={openToast} message={toastMessage} sx={{ bottom: { xs: 0, sm: 0 } }} />
    </>
  );
}

export default Contact;
