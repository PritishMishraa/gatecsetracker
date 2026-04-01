import { FunctionSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

type TSubjectCard = {
  subjectCode: string;
  subjectName: string;
};

const SubjectCard = ({ subjectCode, subjectName }: TSubjectCard) => {
  return (
    <Link
      href={{ pathname: `/subject/${subjectName}` }}
      className="group relative mx-2 block h-64 md:mx-0"
    >
      <span className="border-primary absolute inset-0 border-2 border-dashed"></span>

      <div className="border-primary bg-primary relative flex h-full transform items-end border-2 text-black transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 pt-0! transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          <FunctionSquare size={48} />

          <h2 className="mt-4 text-xl font-medium sm:text-2xl">
            {subjectName}
          </h2>
        </div>

        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">
            {subjectName}
          </h3>

          <p className="mt-8 font-bold">Study Now</p>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
