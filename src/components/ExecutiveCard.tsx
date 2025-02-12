
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkedinIcon, BriefcaseIcon } from "lucide-react";

interface ExecutiveCardProps {
  name: string;
  position: string;
  company: string;
  industry: string;
  linkedin?: string;
}

export const ExecutiveCard = ({ name, position, company, industry, linkedin }: ExecutiveCardProps) => {
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
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <BriefcaseIcon className="h-4 w-4" />
          <span className="text-sm">{position}</span>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">{company}</p>
          <Badge variant="secondary" className="text-xs">
            {industry}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
