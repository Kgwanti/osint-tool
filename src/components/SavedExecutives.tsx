
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Edit2, Save, XCircle } from "lucide-react";

interface SavedExecutive {
  id: number;
  name: string;
  position: string;
  company: string;
  notes?: string;
}

interface SavedExecutivesProps {
  executives: SavedExecutive[];
  onRemove: (id: number) => void;
  onUpdate: (executive: SavedExecutive) => void;
}

export const SavedExecutives = ({ executives, onRemove, onUpdate }: SavedExecutivesProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<SavedExecutive | null>(null);

  const handleEdit = (executive: SavedExecutive) => {
    setEditingId(executive.id);
    setEditForm(executive);
  };

  const handleSave = () => {
    if (editForm) {
      onUpdate(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Executives ({executives.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {executives.length === 0 ? (
            <p className="text-sm text-gray-500">No saved executives yet</p>
          ) : (
            <div className="space-y-4">
              {executives.map((exec) => (
                <Card key={exec.id} className="p-4">
                  {editingId === exec.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editForm?.name}
                        onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                        placeholder="Name"
                        className="w-full"
                      />
                      <Input
                        value={editForm?.position}
                        onChange={(e) => setEditForm({ ...editForm!, position: e.target.value })}
                        placeholder="Position"
                        className="w-full"
                      />
                      <Input
                        value={editForm?.company}
                        onChange={(e) => setEditForm({ ...editForm!, company: e.target.value })}
                        placeholder="Company"
                        className="w-full"
                      />
                      <Textarea
                        value={editForm?.notes || ""}
                        onChange={(e) => setEditForm({ ...editForm!, notes: e.target.value })}
                        placeholder="Additional notes..."
                        className="w-full"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave} className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{exec.name}</h3>
                          <p className="text-sm text-gray-500">{exec.position} at {exec.company}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(exec)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onRemove(exec.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {exec.notes && (
                        <p className="text-sm text-gray-600 mt-2">{exec.notes}</p>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
