import { ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Contact } from "../types/Contact";

function ContactItem({ contact, onSelect }: { contact: Contact; onSelect: (contact: Contact) => void }) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => onSelect(contact)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={contact.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default ContactItem;
