import { FileCode, Palette, Timer } from "lucide-solid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDisplayName, type RepoResource } from "@/lib/resources/model";

interface ResourceCardProps {
  resource: RepoResource;
}

export function ResourceCard(props: ResourceCardProps) {
  const name = getDisplayName(props.resource);
  const icon = () => {
    switch (props.resource.type) {
      case "split":
        return Timer;
      case "theme":
        return Palette;
      case "auto-splitter":
        return FileCode;
    }
  };
  const Icon = icon();

  return (
    <Card class="h-full transition hover:border-primary hover:shadow-lg">
      <CardHeader>
        <div class="mb-2 flex items-center gap-2">
          <Icon class="size-4 text-muted-foreground" />
          <span class="text-xs text-muted-foreground uppercase">
            {props.resource.type}
          </span>
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription class="truncate">
          {props.resource.path}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
