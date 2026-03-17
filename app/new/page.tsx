"use client";

import { useEffect, useState } from "react";

const TARGET_COLS = 8;
const TARGET_ROWS = 8;

const cellStyle = {
  backgroundImage:
    "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
  backgroundSize: "7px 7px",
  backgroundAttachment: "fixed" as const,
  color: "hsl(var(--foreground) / 0.08)",
};

export default function NewPage() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellW: 0, cellH: 0 });

  useEffect(() => {
    function calc() {
      setGrid({
        cols: TARGET_COLS,
        rows: TARGET_ROWS,
        cellW: window.innerWidth / TARGET_COLS,
        cellH: window.innerHeight / TARGET_ROWS,
      });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  if (grid.cols === 0) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Grid overlay — border cells only */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.cellW}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${grid.cellH}px)`,
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, i) => {
          const row = Math.floor(i / grid.cols);
          const col = i % grid.cols;
          const isBorder =
            row === 0 ||
            row === grid.rows - 1 ||
            col === 0 ||
            col === grid.cols - 1;

          if (!isBorder) return null;
          return (
            <div
              key={i}
              className="hidden border border-border md:block"
              style={{ ...cellStyle, gridColumn: col + 1, gridRow: row + 1 }}
            />
          );
        })}
        {/* Card spanning inner area */}
        <div
          className="col-[1/9] row-[1/9] bg-primary-foreground grid grid-cols-1 divide-y divide-dashed divide-border border-0 md:col-[2/8] md:row-[2/8] md:border md:border-border lg:grid-cols-2 lg:divide-y-0 lg:divide-x"
        >
          <div>
            <h1>New Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
}