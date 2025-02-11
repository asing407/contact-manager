
import { useState } from "react";
import { Contact, ContactFormData } from "@/types/contact";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  searchContacts,
} from "@/lib/store";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus } from "lucide-react";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>(getContacts());
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = query ? searchContacts(query) : getContacts();
    setContacts(results);
  };

  const handleAddContact = (data: ContactFormData) => {
    const newContact = addContact(data);
    setContacts(getContacts());
    setIsAddModalOpen(false);
    toast({
      title: "Contact Added",
      description: `${data.fullName} has been added to your contacts.`,
    });
  };

  const handleEditContact = (data: ContactFormData) => {
    if (selectedContact) {
      updateContact(selectedContact.id, data);
      setContacts(getContacts());
      setIsEditModalOpen(false);
      setSelectedContact(null);
      toast({
        title: "Contact Updated",
        description: `${data.fullName}'s information has been updated.`,
      });
    }
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      setContacts(getContacts());
      setIsDeleteDialogOpen(false);
      toast({
        title: "Contact Deleted",
        description: `${selectedContact.fullName} has been removed from your contacts.`,
        variant: "destructive",
      });
      setSelectedContact(null);
    }
  };

  return (
    <>
      <div className="animated-background" />
      <div className="content-wrapper">
        <div className="container mx-auto py-12 px-4 md:px-6 animate-fade-in">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="heading-primary">Contact Manager</h1>
              <p className="subheading">
                Organize and manage your contacts efficiently
              </p>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
              <div className="relative max-w-md w-full mx-auto md:mx-0">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 enhanced-card"
                />
              </div>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="btn-enhanced max-w-md mx-auto md:mx-0"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Contact
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={() => {
                    setSelectedContact(contact);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedContact(contact);
                    setIsDeleteDialogOpen(true);
                  }}
                />
              ))}
              {contacts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "No contacts found matching your search"
                      : "No contacts yet. Add your first contact!"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[425px] enhanced-card">
              <DialogHeader>
                <DialogTitle className="text-center">Add New Contact</DialogTitle>
              </DialogHeader>
              <ContactForm onSubmit={handleAddContact} />
            </DialogContent>
          </Dialog>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px] enhanced-card">
              <DialogHeader>
                <DialogTitle className="text-center">Edit Contact</DialogTitle>
              </DialogHeader>
              {selectedContact && (
                <ContactForm
                  initialData={{
                    fullName: selectedContact.fullName,
                    email: selectedContact.email,
                    phone: selectedContact.phone,
                    address: selectedContact.address,
                    notes: selectedContact.notes,
                  }}
                  onSubmit={handleEditContact}
                />
              )}
            </DialogContent>
          </Dialog>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent className="enhanced-card">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">Delete Contact</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Are you sure you want to delete{" "}
                  {selectedContact?.fullName}? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="justify-center space-x-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteContact}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default Index;
