import React from 'react';

interface SectionHeadingProps {
  tag?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  tag,
  badge,
  title,
  subtitle,
  description,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  const displayTag = tag || badge;
  const displaySub = subtitle || description;

  return (
    <div className={`space-y-3 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {displayTag && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
          <span>{displayTag}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.025em] leading-[1.08]">
        {title}
      </h2>
      {displaySub && (
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          {displaySub}
        </p>
      )}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const styles = {
    brand: 'bg-brand/15 text-brand border-brand/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    neutral: 'bg-dark-muted text-gray-300 border-dark-border',
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
