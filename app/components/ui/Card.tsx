import React from "react";
import { clsx } from "clsx";

/* ───────────────────────────────────────────
   Card Root
   ─────────────────────────────────────────── */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  accent?: boolean;
  children: React.ReactNode;
}

function Card({ hover = false, accent = false, children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl border border-gray-200 overflow-hidden",
        "shadow-[var(--shadow-base)]",
        "transition-all duration-300 ease-out",
        hover && "hover:shadow-[var(--shadow-lg)] hover:-translate-y-1",
        accent && "border-t-2 border-t-primary-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Card.Header
   ─────────────────────────────────────────── */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx("px-6 pt-6 pb-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Card.Body
   ─────────────────────────────────────────── */
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div
      className={clsx("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Card.Footer
   ─────────────────────────────────────────── */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx(
        "px-6 py-4 border-t border-gray-100 bg-gray-50/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Compound Export
   ─────────────────────────────────────────── */
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
