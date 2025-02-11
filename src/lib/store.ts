
import { Contact } from "@/types/contact";

let contacts: Contact[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, Country",
    notes: "Met at conference",
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Town, Country",
    notes: "Project collaborator",
    createdAt: new Date("2024-01-02").toISOString(),
    updatedAt: new Date("2024-01-02").toISOString(),
  },
];

export const getContacts = () => contacts;

export const getContact = (id: string) => contacts.find((c) => c.id === id);

export const addContact = (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
  const newContact: Contact = {
    ...contact,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  contacts = [...contacts, newContact];
  return newContact;
};

export const updateContact = (id: string, contact: Partial<Contact>) => {
  contacts = contacts.map((c) =>
    c.id === id
      ? {
          ...c,
          ...contact,
          updatedAt: new Date().toISOString(),
        }
      : c
  );
  return getContact(id);
};

export const deleteContact = (id: string) => {
  contacts = contacts.filter((c) => c.id !== id);
};

export const searchContacts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(lowercaseQuery) ||
      contact.email.toLowerCase().includes(lowercaseQuery) ||
      contact.phone.toLowerCase().includes(lowercaseQuery) ||
      contact.address?.toLowerCase().includes(lowercaseQuery) ||
      contact.notes?.toLowerCase().includes(lowercaseQuery)
  );
};
