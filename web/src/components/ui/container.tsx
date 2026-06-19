import { cn } from "@/lib/utils";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-6xl mx-auto px-4 text-center min-h-screen flex flex-col items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
