import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, BookmarkIcon } from "lucide-react";

interface ExecutiveCardProps {
  id: number;
  name: string;
  position: string;
  company: string;
  industry: string;
  linkedin?: string;
  onSave: (executive: Omit<ExecutiveCardProps, 'onSave'>) => void;
  isSaved?: boolean;
}

export const ExecutiveCard = ({ id, name, position, company, industry, linkedin, onSave, isSaved }: ExecutiveCardProps) => {
  return (
    <Card className="w-full animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="font-serif text-xl">{name}</CardTitle>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">{position}</p>
        <p className="text-sm text-gray-600">{company}</p>
        <p className="text-sm text-gray-600">{industry}</p>
        <div className="flex gap-2">
          {linkedin && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          )}
          <Button 
            variant={isSaved ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => onSave({ id, name, position, company, industry, linkedin })}
          >
            <BookmarkIcon className="w-4 h-4 mr-2" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};