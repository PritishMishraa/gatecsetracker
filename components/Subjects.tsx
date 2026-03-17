import {
  FunctionSquare,
  Settings,
  Network,
  Database,
  Code,
  Cpu,
  MonitorUp,
  BarChart4,
  Box,
  CheckSquare,
  ReplaceAll,
  FileTerminalIcon,
  InfinityIcon,
  LucideIcon,
} from "lucide-react";

import CategoryCard from "./category-card";
import subjects from "@/data/subjects.json";

const ICON_MAP: Record<string, LucideIcon> = {
  FunctionSquare,
  Settings,
  Network,
  Database,
  Code,
  Cpu,
  MonitorUp,
  BarChart4,
  Box,
  CheckSquare,
  ReplaceAll,
  FileTerminalIcon,
  InfinityIcon,
};

export const Subjects = () => {
  return (
    <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => {
        const IconComponent = ICON_MAP[subject.icon] ?? Box;
        return (
          <CategoryCard
            key={subject.slug}
            slug={subject.slug}
            name={subject.name}
            description={subject.description}
            icon={<IconComponent className="h-6 w-6" />}
            pattern={{
              y: 16,
              squares: [
                [0, 1],
                [1, 3],
              ],
            }}
          />
        );
      })}
    </div>
  );
};
