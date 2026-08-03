'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/65 backdrop-blur-sm', className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 grid w-full max-h-[94dvh] gap-4 overflow-y-auto rounded-t-2xl border border-[var(--oe-border)] bg-[var(--oe-surface)] p-4 pb-[max(1rem,var(--oe-safe-bottom))] shadow-xl duration-200 sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[calc(100%-1.5rem)] sm:max-w-2xl sm:max-h-[90dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-6',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden />
      {children}
      <DialogPrimitive.Close className="oe-tap oe-touch absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex items-center justify-center rounded-md text-[var(--oe-text-muted)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)]">
        <X className="h-4 w-4" />
        <span className="sr-only">Fermer</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 pr-8 text-left', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2 [&_button]:w-full sm:[&_button]:w-auto', className)} {...props} />
  );
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-heading text-lg font-semibold text-[var(--oe-text)]', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--oe-text-muted)]', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
