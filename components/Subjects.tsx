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
} from "lucide-react";

import CategoryCard from "./category-card";

const SUBJECTS: {
  title: string;
  slug: string;
  description: string;
  icon: JSX.Element;
}[] = [
  {
    title: "Discrete Mathematics",
    slug: "dm",
    description:
      "This subject covers the study of mathematical structures that are fundamentally discrete rather than continuous.",
    icon: <FunctionSquare className="h-6 w-6" />,
  },
  {
    title: "Theory of Computation",
    slug: "toc",
    description:
      "This subject deals with the study of abstract machines and computational problems.",
    icon: <Settings className="h-6 w-6" />,
  },
  {
    title: "Computer Network",
    slug: "cn",
    description:
      "This subject focuses on the study of data communication and computer networking.",
    icon: <Network className="h-6 w-6" />,
  },
  {
    title: "Database Management System",
    slug: "dbms",
    description:
      "This subject covers the study of managing and organizing data in a database.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "C Programming",
    slug: "cp",
    description:
      "This subject involves learning the C programming language and its applications.",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Digital Logic",
    slug: "dl",
    description:
      "This subject focuses on the study of digital circuits and logic gates.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Operating System",
    slug: "os",
    description:
      "This subject covers the study of computer operating systems and their components.",
    icon: <MonitorUp className="h-6 w-6" />,
  },
  {
    title: "Computer Organization & Architecture",
    slug: "coa",
    description:
      "This subject involves the study of the structure and organization of computer systems.",
    icon: <BarChart4 className="h-6 w-6" />,
  },
  {
    title: "Data Structure",
    slug: "ds",
    description:
      "This subject covers the study of data organization and efficient algorithms.",
    icon: <Box className="h-6 w-6" />,
  },
  {
    title: "Aptitude",
    slug: "a",
    description:
      "This subject involves testing the problem-solving and reasoning skills of individuals.",
    icon: <CheckSquare className="h-6 w-6" />,
  },
  {
    title: "Engineering Mathematics",
    slug: "em",
    description:
      "This subject covers the study of mathematical concepts and their applications in engineering.",
    icon: <InfinityIcon className="h-6 w-6" />,
  },
  {
    title: "Compiler Design",
    slug: "cd",
    description:
      "This subject covers the study of designing and building a compiler.",
    icon: <FileTerminalIcon className="h-6 w-6" />,
  },
  {
    title: "Algorithms",
    slug: "algo",
    description:
      "This subject covers the study of designing and building algorithms.",
    icon: <ReplaceAll className="h-6 w-6" />,
  },
];

export const Subjects = () => {
  return (
    <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SUBJECTS.map((subject) => (
        <CategoryCard
          key={subject.slug}
          slug={subject.slug}
          name={subject.title}
          description={subject.description}
          icon={subject.icon}
          pattern={{
            y: 16,
            squares: [
              [0, 1],
              [1, 3],
            ],
          }}
        />
      ))}
    </div>
  );
};
