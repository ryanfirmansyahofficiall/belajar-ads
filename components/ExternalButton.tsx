'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ExternalButtonProps {
  href?: string | null;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fallbackText?: string;
  showIcon?: boolean;
}

export function ExternalButton({
  href,
  children,
  className = '',
  variant = 'primary',
  fallbackText = 'Informasi registrasi/link akan segera dibuka.',
  showIcon = true,
}: ExternalButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 text-sm px-5 py-2.5';
  
  const variantStyles = {
    primary: 'bg-brand hover:bg-brand-hover text-white glow-orange-sm font-semibold active:scale-[0.98]',
    secondary: 'bg-dark-card hover:bg-dark-muted text-gray-200 border border-dark-border hover:border-gray-600',
    outline: 'border border-brand/50 text-brand hover:bg-brand/10 hover:border-brand',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  };

  const hasValidUrl = href && href.trim().length > 0 && !href.startsWith('#TODO') && href !== '#';

  if (!hasValidUrl) {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          <span>{children}</span>
          {showIcon && <ArrowRight className="ml-1.5 w-4 h-4 opacity-80" />}
        </button>
        {showToast && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-dark-card border border-brand/40 text-xs text-gray-200 py-2 px-3 rounded-lg shadow-xl z-50 text-center animate-fade-in">
            {fallbackText}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      {showIcon && <ArrowRight className="ml-1.5 w-4 h-4 opacity-80" />}
    </a>
  );
}
