"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { emergencyContacts as initialContacts, EmergencyContact } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);

  // In a real app, these would be API calls.
  const addContact = () => {
    // Dummy data for new contact
    const newContact: EmergencyContact = {
      id: `ec${contacts.length + Math.random()}`,
      name: "New Contact",
      phone: "+91 12345 67890",
      relation: "Friend",
      avatar: "emergency-contact-1", // Re-use avatar for demo
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>
                These contacts will be notified when you activate the panic button.
              </CardDescription>
            </div>
            <Button onClick={addContact}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Avatar</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => {
                const avatarImage = placeholderImages.find(p => p.id === contact.avatar);
                return (
                  <TableRow key={contact.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Avatar>
                        {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={contact.name} data-ai-hint={avatarImage.imageHint} />}
                        <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.relation}</TableCell>
                    <TableCell className="hidden md:table-cell">{contact.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button aria-label="Remove contact" variant="ghost" size="icon" onClick={() => removeContact(contact.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Other settings could go here */}
    </div>
  );
}
