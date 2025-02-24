import React from "react";
import { Input } from "reactstrap";

const TextSearchFilter = ({
  column: { filterValue, setFilter },
}: {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
}) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value || ""); // Set empty string to remove the filter entirely
      }}
      placeholder={`Search...`}
    />
  );
};

export default TextSearchFilter;