"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Trash2, Edit3, Phone, UserCircle2 } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

const initialContacts: EmergencyContact[] = [
  { id: "1", name: "Jane Doe", phone: "555-123-4567" },
  { id: "2", name: "John Smith", phone: "555-987-6543" },
];

export function EmergencyContactsClient() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      toast({
        title: "Error",
        description: "Name and phone number cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    // Basic phone validation (example)
    if (!/^\d{3}-\d{3}-\d{4}$/.test(newContactPhone.trim()) && !/^\d{10}$/.test(newContactPhone.trim())) {
       toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., 555-123-4567 or 1234567890).",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      const newId = (contacts.length + 1).toString();
      setContacts([...contacts, { id: newId, name: newContactName, phone: newContactPhone }]);
      setNewContactName("");
      setNewContactPhone("");
      toast({
        title: "Contact Added",
        description: `${newContactName} has been added to your emergency contacts.`,
      });
      setIsAdding(false);
      // Programmatically close dialog by finding its close button if possible, or manage open state
    }, 1000);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "The contact has been removed.",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">
            <UserPlus className="mr-2 h-5 w-5" /> Add New Contact
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>
              Enter the name and phone number of your new emergency contact.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Mom"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 555-555-5555"
                type="tel"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isAdding}>Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleAddContact} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {contacts.length === 0 ? (
        <Card className="text-center py-8 shadow-md">
          <CardContent>
            <UserCircle2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">You haven't added any emergency contacts yet.</p>
            <p className="text-sm text-muted-foreground">Add contacts to notify them in case of an emergency.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <UserCircle2 className="mr-3 h-6 w-6 text-primary" />
                  {contact.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <p>{contact.phone}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" aria-label="Edit contact" className="text-muted-foreground hover:text-primary" onClick={() => toast({title: "Edit Contact", description: "Edit functionality coming soon."})}>
                  <Edit3 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete contact" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeleteContact(contact.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
