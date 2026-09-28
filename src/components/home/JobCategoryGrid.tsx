"use client";

import { Children, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./JobCategories.module.css";

const INITIAL_FIELD_COUNT = 8;

export default function JobCategoryGrid({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const fields = Children.toArray(children);

  return (
    <>
      <ul id={gridId} className={styles.grid}>
        {expanded ? fields : fields.slice(0, INITIAL_FIELD_COUNT)}
      </ul>
      {fields.length > INITIAL_FIELD_COUNT && (
        <div className={styles.revealControls}>
          <button
            type="button"
            className={styles.revealButton}
            aria-expanded={expanded}
            aria-controls={gridId}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "See less" : "See more"}
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
