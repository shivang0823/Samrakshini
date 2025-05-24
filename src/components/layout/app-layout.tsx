
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShieldCheck, LayoutDashboard, AlertTriangle, FileText, Users, MessageSquareWarning, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/report-unsafe-area', label: 'Report Area', icon: MessageSquareWarning },
  { href: '/incident-summarizer', label: 'AI Summarizer', icon: FileText },
  { href: '/emergency-contacts', label: 'Contacts', icon: UserPlus },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
                <ShieldCheck className="h-7 w-7 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
                Samrakshini
              </h1>
            </Link>
          </SidebarHeader>
          <ScrollArea className="flex-grow">
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={{ children: item.label, className: "bg-sidebar text-sidebar-foreground border-sidebar-border" }}
                        className="group-data-[collapsible=icon]:justify-center"
                      >
                        <a>
                          <item.icon className="group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </ScrollArea>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex items-center h-14 px-4 border-b bg-background md:hidden">
            <SidebarTrigger />
            <Link href="/" className="ml-4">
              <h1 className="text-lg font-semibold text-primary">Samrakshini</h1>
            </Link>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
