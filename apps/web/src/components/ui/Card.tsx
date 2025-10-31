import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'hover-lift';
  children: React.ReactNode;
}

/**
 * Card component with multiple variants
 * 
 * @example
 * <Card variant="hover-lift">
 *   <CardHeader><CardTitle>Title</CardTitle></CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
export const Card = ({ className, variant = 'default', children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        {
          'bg-white shadow-md': variant === 'default',
          'bg-gradient-forest-jade text-white': variant === 'gradient',
          'bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300':
            variant === 'hover-lift',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
};

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = ({ className, children, as: Component = 'h3', ...props }: CardTitleProps) => {
  return (
    <Component className={cn('text-xl font-bold font-display', className)} {...props}>
      {children}
    </Component>
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};
