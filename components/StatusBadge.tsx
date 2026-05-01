import { CheckCircle2, Clock3, Flag, Gavel, Handshake, MessageSquare, PauseCircle } from "lucide-react";
import type { ComponentType } from "react";
import { Status } from "@/types/regulation";
import { cn, statusClass, statusLabel } from "@/lib/utils";
import { Badge } from "./Badge";

const statusIcon = {
  consultation: MessageSquare,
  adopted: Gavel,
  in_force: CheckCircle2,
  first_reporting: Flag,
  transition: Clock3,
  paused: PauseCircle,
  voluntary: Handshake
} satisfies Record<Status, ComponentType<{ className?: string }>>;

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const Icon = statusIcon[status];

  return (
    <Badge className={cn("inline-flex items-center gap-1.5", statusClass[status], className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {statusLabel[status]}
    </Badge>
  );
}
