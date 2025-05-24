import { PageTitle } from "@/components/page-title";
import { UserPlus } from "lucide-react";
import { EmergencyContactsClient } from "./emergency-contacts-client";

export default function EmergencyContactsPage() {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Emergency Contacts" 
        icon={UserPlus}
        description="Manage your list of emergency contacts. These contacts will be notified in case of an SOS alert."
      />
      <EmergencyContactsClient />
    </div>
  );
}
