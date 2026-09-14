import { FileCode, Palette, Timer } from "lucide-solid";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <Icon />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
