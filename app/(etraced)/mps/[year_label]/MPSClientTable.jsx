"use client";

import { useState, useMemo } from "react";

import QuarterTable from "./QuarterTable";
export default function MPSClientTable({ profile, mpsData }) {
  const [editingRow, setEditingRow] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewMode, setViewMode] = useState("quarter");

  const admin = profile.role === "admin" || profile.role === "editor";

  async function handleDelete(row) {
    const confirmed = confirm(
      `Delete Grade ${row.grade_level} - Section ${row.section}?`
    );
    if (!confirmed) return;

    try {
      setDeletingId(row.id);
      await deleteMPSData(row.id, mpsData.id);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }
  const SUBJECT_KEYS = [
    "gmrc",
    "epp",
    "filipino",
    "english",
    "math",
    "science",
    "ap",
    "mapeh",
    "reading_literacy",
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "grade_level",
        header: "Grade",
        cell: ({ getValue }) => getValue().toUpperCase(),
      },

      {
        accessorKey: "section",
        header: "Section",
        cell: ({ getValue }) => getValue().toUpperCase(),
      },

      { accessorKey: "gmrc", header: "GMRC" },
      { accessorKey: "epp", header: "EPP" },
      { accessorKey: "filipino", header: "Fil" },
      { accessorKey: "english", header: "Eng" },
      { accessorKey: "math", header: "Math" },
      { accessorKey: "science", header: "Sci" },
      { accessorKey: "ap", header: "AP" },
      { accessorKey: "mapeh", header: "MAPEH" },
      { accessorKey: "reading_literacy", header: "Reading" },

      {
        header: "Total",
        cell: ({ row }) => {
          const values = SUBJECT_KEYS.map((key) =>
            Number(row.original[key])
          ).filter((v) => !isNaN(v) && v > 0);

          if (values.length === 0) return "-";

          const average = values.reduce((sum, v) => sum + v, 0) / values.length;

          return average.toFixed(2);
        },
      },

      {
        accessorKey: "link",
        header: "Link",
        cell: ({ getValue }) =>
          getValue() ? (
            <a href={getValue()} target="_blank" className="text-blue-600 ">
              View
            </a>
          ) : (
            "-"
          ),
      },
    ],
    [deletingId]
  );

  const dataByQuarter = useMemo(() => {
    const getGradeNumber = (grade) => Number(grade.replace(/[^0-9]/g, ""));

    const grouped = {
      "1st quarter": [],
      "2nd quarter": [],
      "3rd quarter": [],
      "4th quarter": [],
    };

    mpsData.forEach((item) => {
      if (grouped[item.quarter]) {
        grouped[item.quarter].push(item);
      }
    });

    Object.keys(grouped).forEach((q) => {
      grouped[q].sort(
        (a, b) => getGradeNumber(a.grade_level) - getGradeNumber(b.grade_level)
      );
    });

    return grouped;
  }, [mpsData]);
  const consolidatedByQuarter = useMemo(() => {
    const result = {
      "1st quarter": [],
      "2nd quarter": [],
      "3rd quarter": [],
      "4th quarter": [],
    };
    const getGradeNumber = (grade) => Number(grade.replace(/[^0-9]/g, ""));
    const getKey = (row) => row.grade_level; // ✅ ONLY grade

    Object.keys(result).forEach((quarter) => {
      const map = {};

      mpsData
        .filter((row) => row.quarter === quarter)
        .forEach((row) => {
          const key = getKey(row);

          if (!map[key]) {
            map[key] = {
              grade_level: row.grade_level,
              quarter,
              counts: {},
            };

            SUBJECT_KEYS.forEach((subj) => {
              map[key][subj] = 0;
              map[key].counts[subj] = 0;
            });
          }

          SUBJECT_KEYS.forEach((subj) => {
            const value = Number(row[subj]);

            if (!isNaN(value) && value > 0) {
              map[key][subj] += value; // sum GMRC, EPP, etc.
              map[key].counts[subj] += 1;
            }
          });
        });

      result[quarter] = Object.values(map).map((item) => {
        SUBJECT_KEYS.forEach((subj) => {
          item[subj] =
            item.counts[subj] > 0
              ? (item[subj] / item.counts[subj]).toFixed(2) // average
              : "-";
        });

        delete item.counts;
        return item;
      });

      result[quarter].sort(
        (a, b) => getGradeNumber(a.grade_level) - getGradeNumber(b.grade_level)
      );
    });

    return result;
  }, [mpsData]);

  const consolidatedColumns = useMemo(
    () => [
      {
        accessorKey: "grade_level",
        header: "Grade",
        cell: ({ getValue }) => getValue().toUpperCase(),
      },
      {
        accessorKey: "section",
        header: "Section",
        // cell: ({ getValue }) => getValue().toUpperCase(),
      },

      { accessorKey: "gmrc", header: "GMRC" },
      { accessorKey: "epp", header: "EPP" },
      { accessorKey: "filipino", header: "Fil" },
      { accessorKey: "english", header: "Eng" },
      { accessorKey: "math", header: "Math" },
      { accessorKey: "science", header: "Sci" },
      { accessorKey: "ap", header: "AP" },
      { accessorKey: "mapeh", header: "MAPEH" },
      { accessorKey: "reading_literacy", header: "Reading" },

      {
        header: "Total",
        cell: ({ row }) => {
          const values = SUBJECT_KEYS.map((key) =>
            Number(row.original[key])
          ).filter((v) => !isNaN(v));

          if (!values.length) return "-";

          return (
            values.reduce((sum, v) => sum + v, 0) / values.length
          ).toFixed(2);
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setViewMode("quarter")}
          className={`px-3 py-1 text-sm rounded ${
            viewMode === "quarter" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Individual View
        </button>

        <button
          onClick={() => setViewMode("consolidated")}
          className={`px-3 py-1 text-sm rounded ${
            viewMode === "consolidated"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Consolidated View
        </button>
      </div>

      {viewMode === "quarter" &&
        Object.entries(dataByQuarter).map(([quarter, data]) => (
          <QuarterTable
            key={quarter}
            title={quarter}
            data={data}
            columns={columns}
          />
        ))}

      {viewMode === "consolidated" &&
        Object.entries(consolidatedByQuarter).map(([quarter, data]) => (
          <QuarterTable
            key={quarter}
            title={`${quarter} – Consolidated`}
            data={data}
            columns={consolidatedColumns}
          />
        ))}
    </>
  );
}
