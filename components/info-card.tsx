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
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {title}
            {tags && tags.length > 0 && (
              <span role="list" className="flex gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="ml-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </CardTitle>
          {right}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
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
