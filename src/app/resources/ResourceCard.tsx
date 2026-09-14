import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getDisplayName, type RepoResource } from "@/lib/resources/model";

interface ResourceCardProps {
  resource: RepoResource;
}

export function ResourceCard(props: ResourceCardProps) {
  const name = getDisplayName(props.resource);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
