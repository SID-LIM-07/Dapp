// components/ui.tsx

import React from 'react';

// Button Component
export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="btn-class" {...props}>
    {children}
  </button>
);

// Input Component
export const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="input-class" {...props} />
);

// Textarea Component
export const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className="textarea-class" {...props}></textarea>
);

// Card Component
export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card-class">{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content-class">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header-class">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="card-title-class">{children}</h2>
);

// Badge Component
export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="badge-class">{children}</span>
);

// Export any other components as needed.

