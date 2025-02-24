import React, { useMemo } from "react";
import { useTable, useFilters, Column } from "react-table";
import { Table, Input, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import TextSearchFilter from "./filters/TextSearchFilter";

// Define data interface for Certificate
interface Certificate {
  certificateCode: string;
  certificateLabel: string;
  isActive: boolean;
  expiry: "Yes" | "No";
  expiryYears?: number; // Optional, only if expiry is 'Yes'
  hasExpiredUsers: boolean; // Flag to indicate if any user has an expired certificate
}

// Mock data for certificates
const mockCertificateData: Certificate[] = [
  {
    certificateCode: "CERT001",
    certificateLabel: "Product Knowledge Certification - Level 1",
    isActive: true,
    expiry: "Yes",
    expiryYears: 2,
    hasExpiredUsers: true,
  },
  {
    certificateCode: "CERT002",
    certificateLabel: "Sales Skills Training - Advanced",
    isActive: true,
    expiry: "No",
    hasExpiredUsers: false,
  },
  {
    certificateCode: "CERT003",
    certificateLabel: "Customer Relationship Management (CRM) Basics",
    isActive: false,
    expiry: "Yes",
    expiryYears: 5,
    hasExpiredUsers: true,
  },
  {
    certificateCode: "CERT004",
    certificateLabel: "Team Leadership Fundamentals",
    isActive: true,
    expiry: "Yes",
    expiryYears: 3,
    hasExpiredUsers: false,
  },
  {
    certificateCode: "CERT005",
    certificateLabel: "Effective Communication Strategies",
    isActive: false,
    expiry: "No",
    hasExpiredUsers: false,
  },
];

// Define filter types for custom filters
type FilterValue = string | number | boolean | undefined;

const Certificates: React.FC = () => {
  const data: Certificate[] = useMemo(() => mockCertificateData, []);

  const columns: Column<Certificate>[] = useMemo(
    () => [
      {
        Header: "Certificate Code",
        accessor: "certificateCode",
        Filter: TextSearchFilter,
      },
      {
        Header: "Certificate Label",
        accessor: "certificateLabel",
        Filter: TextSearchFilter,
      },
      {
        Header: "Is Active",
        accessor: "isActive",
        Filter: ({
          column: { filterValue, setFilter },
        }: {
          column: {
            filterValue: FilterValue;
            setFilter: (value: FilterValue) => void;
          };
        }) => (
          <Input
            type="select"
            value={filterValue === undefined ? "" : filterValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFilter(e.target.value || undefined);
            }}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
        ),
        filter: (rows: any, id: string, filterValue: FilterValue) => {
          if (filterValue === undefined || filterValue === "") {
            return rows;
          }
          return rows.filter((row: any) => {
            const rowValue = row.values[id];
            return String(rowValue) === String(filterValue);
          });
        },
        Cell: ({ value }: { value: boolean }) => (value ? "Yes" : "No"), // Display Yes/No in cell
      },
      {
        Header: "Expiry",
        accessor: "expiry",
        Filter: ({
          column: { filterValue, setFilter },
        }: {
          column: {
            filterValue: FilterValue;
            setFilter: (value: FilterValue) => void;
          };
        }) => (
          <Input
            type="select"
            value={filterValue === undefined ? "" : filterValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFilter(e.target.value || undefined);
            }}
          >
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Input>
        ),
        filter: (rows: any, id: string, filterValue: FilterValue) => {
          if (filterValue === undefined || filterValue === "") {
            return rows;
          }
          return rows.filter((row: any) => {
            const rowValue = row.values[id];
            return String(rowValue) === String(filterValue);
          });
        },
        Cell: ({ row }: { row: any }) => {
          const expiry = row.original.expiry;
          const expiryYears = row.original.expiryYears;
          return expiry === "Yes" ? `Yes (${expiryYears} years)` : "No";
        },
      },
      {
        Header: "Action",
        disableFilters: true, // Disable global filter for action column
        Cell: ({ row }: { row: any }) => (
          <div>
            <NavLink
              href="#"
              color="link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                alert(`View users for ${row.original.certificateLabel}`);
                // Implement slide-in panel logic here later
              }}
            >
              <a href="#">View Users</a>{" "}
              {row.original.hasExpiredUsers && (
                <FontAwesomeIcon
                  icon={faWarning}
                  color="red"
                  className="ms-2"
                />
              )}
            </NavLink>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters
    );

  return (
    <div className="m-4">
      <Table {...getTableProps()} bordered>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className="mb-4">
                    {"Filter" in column
                      ? (column.render("Filter") as React.ReactNode)
                      : null}
                  </div>
                  {column.render("Header") as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell") as React.ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Certificates;
