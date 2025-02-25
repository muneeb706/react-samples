import React, { useMemo, useState } from "react";
import { useTable, useFilters, Column } from "react-table";
import { Table, Input, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWarning } from "@fortawesome/free-solid-svg-icons";
import TextSearchFilter from "./filters/TextSearchFilter";
import "../index.css"; // Import the CSS file for styling

// Define data interface for Certificate
interface Certificate {
  certificateCode: string;
  certificateLabel: string;
  isActive: boolean;
  expiry: "Yes" | "No";
  expiryYears?: number; // Optional, only if expiry is 'Yes'
  hasExpiredUsers: boolean; // Flag to indicate if any user has an expired certificate
}

// Define data interface for User Certificate
interface UserCertificate {
  firstName: string;
  lastName: string;
  username: string;
  expirationDate: string; // Assuming date is in string format initially, e.g., "2024-12-31"
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

// Mock data for users in the slide-in panel
const mockUserCertificateData: UserCertificate[] = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    expirationDate: "2024-12-31",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    expirationDate: "2025-03-15",
  },
  {
    firstName: "Robert",
    lastName: "Brown",
    username: "robertbrown",
    expirationDate: "2024-11-20",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    expirationDate: "2026-01-10",
  },
  {
    firstName: "Michael",
    lastName: "Davis",
    username: "michaeldavis",
    expirationDate: "2025-05-01",
  },
];

// Define filter types for custom filters
type FilterValue = string | number | boolean | undefined;

const Certificates: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

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
                setSelectedCertificate(row.original);
                setIsPanelOpen(true);
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
    <div className={`container mt-5 ${isPanelOpen ? "shrink" : ""}`}>
      <div
        className={`table-container ${isPanelOpen ? "shrink" : ""}`}
        data-testid="certificate-table-container"
      >
        <Table {...getTableProps()} bordered>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="table-header">
                    <div className="filter-container">
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
                    <td
                      {...cell.getCellProps()}
                      style={
                        selectedCertificate?.certificateCode ===
                        row.original.certificateCode
                          ? { backgroundColor: "#e0f7fa" }
                          : {}
                      }
                    >
                      {cell.render("Cell") as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className={`slide-in-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="slide-in-panel-header">
          <h3>{selectedCertificate?.certificateLabel}</h3>
          <button
            className="close-button"
            onClick={() => setIsPanelOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="slide-in-panel-content">
          {/* User Table */}
          <Table bordered>
            {" "}
            {/* Use reactstrap Table for styling consistency */}
            <thead>
              <tr>
                <th>User</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {mockUserCertificateData.map(
                (
                  user,
                  index // Iterate over mock user data
                ) => (
                  <tr key={index}>
                    <td>{`${user.firstName} ${user.lastName} (${user.username})`}</td>{" "}
                    {/* User Column */}
                    <td>{user.expirationDate}</td>{" "}
                    {/* Expiration Date Column */}
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
