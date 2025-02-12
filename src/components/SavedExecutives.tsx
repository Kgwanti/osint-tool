
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SavedExecutive {
  id: number;
  name: string;
  position: string;
  company: string;
}

interface SavedExecutivesProps {
  executives: SavedExecutive[];
  onRemove: (id: number) => void;
}

export const SavedExecutives = ({ executives, onRemove }: SavedExecutivesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Executives ({executives.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {executives.length === 0 ? (
            <p className="text-sm text-gray-500">No saved executives yet</p>
          ) : (
            <div className="space-y-2">
              {executives.map((exec) => (
                <div key={exec.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{exec.name}</p>
                    <p className="text-sm text-gray-500">{exec.position} at {exec.company}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onRemove(exec.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
