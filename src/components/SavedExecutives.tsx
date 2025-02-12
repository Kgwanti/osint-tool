
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {executives.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No saved executives yet
                </TableCell>
              </TableRow>
            ) : (
              executives.map((exec) => (
                <TableRow key={exec.id}>
                  {editingId === exec.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={editForm?.name}
                          onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm?.position}
                          onChange={(e) => setEditForm({ ...editForm!, position: e.target.value })}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm?.company}
                          onChange={(e) => setEditForm({ ...editForm!, company: e.target.value })}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          value={editForm?.notes || ""}
                          onChange={(e) => setEditForm({ ...editForm!, notes: e.target.value })}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{exec.name}</TableCell>
                      <TableCell>{exec.position}</TableCell>
                      <TableCell>{exec.company}</TableCell>
                      <TableCell>{exec.notes}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(exec)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onRemove(exec.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
