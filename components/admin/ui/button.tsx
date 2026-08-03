import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oe-accent)]/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--oe-accent)] text-[var(--oe-accent-ink)] hover:bg-[var(--oe-accent-strong)]',
        secondary:
          'bg-[var(--oe-bg-muted)] text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)] border border-[var(--oe-border)]',
        outline:
          'border border-[var(--oe-border-strong)] bg-transparent hover:bg-[var(--oe-surface-hover)] text-[var(--oe-text)]',
        ghost:
          'hover:bg-[var(--oe-surface-hover)] text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)]',
        destructive:
          'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25',
      },
      size: {
        default: 'min-h-11 h-11 px-4 py-2',
        sm: 'min-h-10 h-10 rounded-md px-3 text-sm',
        lg: 'min-h-12 h-12 rounded-md px-6',
        icon: 'min-h-11 h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';
