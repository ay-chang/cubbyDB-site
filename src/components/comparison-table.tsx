import { COMPARISON_CHECKED, type ComparisonRow } from "@/lib/competitors";

const COLUMNS: { key: keyof Omit<ComparisonRow, "name">; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "updates", label: "Updates included" },
  { key: "computers", label: "Computers per license" },
  { key: "platforms", label: "Platforms" },
];

/** The first row is always CubbyDB and is highlighted. */
export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-[20px] border border-[rgba(27,31,38,0.09)] bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
          <thead>
            <tr className="border-b border-[rgba(27,31,38,0.08)]">
              <th className="px-6 py-4" />
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 font-mono text-[10.5px] font-normal tracking-[0.14em] text-[rgba(27,31,38,0.45)] uppercase"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const ours = i === 0;
              return (
                <tr
                  key={row.name}
                  className={`border-b border-[rgba(27,31,38,0.07)] last:border-b-0 ${ours ? "bg-[#f1f9f4]" : ""}`}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium ${ours ? "text-[#0f7a37]" : "text-[#141820]"}`}
                  >
                    {row.name}
                  </th>
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={`px-5 py-4 ${ours ? "font-medium text-[#0f7a37]" : "text-[rgba(27,31,38,0.7)]"}`}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12.5px] text-[rgba(27,31,38,0.45)]">
        Other products&rsquo; prices are for an individual license, taken from each vendor&rsquo;s
        website in {COMPARISON_CHECKED}. Check their sites for current pricing.
      </p>
    </div>
  );
}
