import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  icon?: LucideIcon;
  className?: string;
  description?: string;
}

export function PageTitle({ title, icon: Icon, className, description }: PageTitleProps) {
  return (
    <div className={cn("mb-6 md:mb-8", className)}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-7 w-7 text-primary" />}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
          {title}
        </h1>
      </div>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
