
import { Contact } from "@/types/contact";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Edit, Trash2 } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card className="contact-card w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{contact.fullName}</CardTitle>
          <CardDescription className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>
              Last updated:{" "}
              {new Date(contact.updatedAt).toLocaleDateString()}
            </span>
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a
              href={`mailto:${contact.email}`}
              className="text-sm hover:underline"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a
              href={`tel:${contact.phone}`}
              className="text-sm hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </div>
        {contact.address && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{contact.address}</span>
          </div>
        )}
        {contact.notes && (
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">{contact.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
