import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  download?: boolean | string;
  external?: boolean;
};

export function CtaLink({
  href,
  children,
  variant = "default",
  className,
  download,
  external,
}: CtaLinkProps) {
  const opensNewTab = external ?? href.startsWith("http");
  return (
    <a
      href={href}
      download={download}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "h-12 w-full rounded-2xl px-4 text-base font-semibold",
        className,
      )}
    >
      {children}
    </a>
  );
}
