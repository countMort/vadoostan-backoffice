"use client";

import ExpCard from "@/components/experiences/ExpCard";

const expList = Array(10).fill("_");
export default function Experiences() {
  return (
    <div className="p-2 space-y-2">
      {expList.map((_, i) => (
        <ExpCard key={i}></ExpCard>
      ))}
    </div>
  );
}
