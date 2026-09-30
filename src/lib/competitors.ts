import { MAX_COMPUTERS, PRICE } from "./pricing";

/** When the competitor figures below were last checked against each vendor's
 *  own pricing page. Re-check before changing anything that quotes them. */
export const COMPARISON_CHECKED = "September 2026";

export type ComparisonRow = {
  name: string;
  price: string;
  updates: string;
  computers: string;
  platforms: string;
};

export const CUBBYDB_ROW: ComparisonRow = {
  name: "CubbyDB",
  price: `${PRICE} once`,
  updates: "Every future update",
  computers: String(MAX_COMPUTERS),
  platforms: "Mac, Windows, Linux",
};

export const TABLEPLUS_ROW: ComparisonRow = {
  name: "TablePlus",
  price: "$99 once",
  updates: "1 year, then renew",
  computers: "1",
  platforms: "Mac, Windows, Linux",
};

/** Buy-once paid clients only. Tools with a free tier (DataGrip, DBeaver,
 *  Beekeeper) compete on experience, not price, so they aren't listed. */
export const COMPARISON: ComparisonRow[] = [
  CUBBYDB_ROW,
  TABLEPLUS_ROW,
  {
    name: "Postico 2",
    price: "$69 once",
    updates: "Postico 2.x only",
    computers: "3",
    platforms: "Mac only",
  },
];
