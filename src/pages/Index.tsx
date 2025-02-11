
import { useEffect, useState } from "react";
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
import { Search, Plus, Loader2 } from "lucide-react";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      setIsLoading(true);
      const results = query ? await searchContacts(query) : await getContacts();
      setContacts(results);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (data: ContactFormData) => {
    try {
      setIsLoading(true);
      await addContact(data);
      await loadContacts();
      setIsAddModalOpen(false);
      toast({
        title: "Contact Added",
        description: `${data.fullName} has been added to your contacts.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contact",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditContact = async (data: ContactFormData) => {
    if (selectedContact) {
      try {
        setIsLoading(true);
        await updateContact(selectedContact.id, data);
        await loadContacts();
        setIsEditModalOpen(false);
        setSelectedContact(null);
        toast({
          title: "Contact Updated",
          description: `${data.fullName}'s information has been updated.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update contact",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteContact = async () => {
    if (selectedContact) {
      try {
        setIsLoading(true);
        await deleteContact(selectedContact.id);
        await loadContacts();
        setIsDeleteDialogOpen(false);
        toast({
          title: "Contact Deleted",
          description: `${selectedContact.fullName} has been removed from your contacts.`,
          variant: "destructive",
        });
        setSelectedContact(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete contact",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="animated-background" />
      <div className="content-wrapper">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2" /> Add Contact
          </Button>
        </header>
        
        <div className="flex items-center mt-4">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button onClick={() => handleSearch(searchQuery)}>
            <Search className="mr-2" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No contacts found matching your search"
                  : "No contacts yet. Add your first contact!"}
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
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
            ))
          )}
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>
            <ContactForm onSubmit={handleAddContact} />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <ContactForm
                onSubmit={handleEditContact}
                initialData={selectedContact}
              />
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the contact.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteContact}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Index;
