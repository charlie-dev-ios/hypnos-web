import { Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AccountMenu() {
  return (
    <Button variant="ghost" size="icon" asChild aria-label="設定">
      <Link href="/settings">
        <Settings className="h-5 w-5" />
      </Link>
    </Button>
  );
}
