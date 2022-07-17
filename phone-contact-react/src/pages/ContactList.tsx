import { List } from "@mui/material";
import ContactItem from "../components/ContactItem";
import { Contact } from "./../types/Contact";

function ContactList({ contactList, onSelect }: { contactList: Contact[]; onSelect: (contact: Contact) => void }) {
  return (
    <List>
      {contactList.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onSelect={onSelect} />
      ))}
    </List>
  );
}

export default ContactList;
