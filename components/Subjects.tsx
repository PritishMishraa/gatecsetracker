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
  PlusSquare,
  LucideIcon,
} from "lucide-react";

import CategoryCard from "./category-card";
import subjects from "@/data/subjects.json";

type SubjectGridCard = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  href?: string;
};

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
  PlusSquare,
};

export const Subjects = () => {
  const cards: SubjectGridCard[] = [
    {
      slug: "request-a-subject",
      name: "Request a Subject",
      description:
        "Missing a playlist or topic? Send the subject request form and we will queue it up.",
      icon: "PlusSquare",
      href: "/request",
    },
    ...subjects.map((subject) => ({
      slug: subject.slug,
      name: subject.name,
      description: subject.description,
      icon: subject.icon,
    })),
  ];

  return (
    <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((subject) => {
        const IconComponent = ICON_MAP[subject.icon] ?? Box;
        return (
          <CategoryCard
            key={subject.slug}
            slug={subject.slug}
            name={subject.name}
            description={subject.description}
            icon={<IconComponent className="h-6 w-6" />}
            href={subject.href}
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
