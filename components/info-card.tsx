import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type InfoCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  right?: React.ReactNode;
  onClick?: () => void;
};

export default function InfoCard({
  title,
  subtitle,
  description,
  tags,
  right,
  onClick,
}: InfoCardProps) {
  return (
    <Card
      onClick={onClick}
      className="transition border hover:shadow-md cursor-pointer"
    >
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {right}
        </div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        {tags && tags.length > 0 && (
          <div role="list" className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      {description && (
        <CardContent>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
