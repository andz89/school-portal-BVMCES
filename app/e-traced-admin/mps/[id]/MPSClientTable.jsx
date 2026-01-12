"use client";

import { useState, useEffect } from "react";
import AddMPSDataModal from "./AddMPSDataModal";
import { deleteMPSData } from "../actions";
export default function MPSClientTable({ mpsId, mpsData }) {
  const [editingRow, setEditingRow] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(row) {
    const confirmed = confirm(
      `Delete Grade ${row.grade_level} - Section ${row.section}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(row.id);
      await deleteMPSData(row.id, mpsId);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }
  return (
    <>
      <AddMPSDataModal
        mpsId={mpsId}
        editingData={editingRow}
        onClose={() => setEditingRow(null)}
      />

      <div className="bg-white border rounded overflow-x-auto">
        <table className="w-full text-sm table-fixed text-center">
          <thead className="border-b bg-gray-50">
            <tr>
              <th>Grade</th>
              <th>Section</th>
              <th>GMRC</th>
              <th>EPP</th>
              <th>Fil</th>
              <th>Eng</th>
              <th>Math</th>
              <th>Sci</th>
              <th>AP</th>
              <th>MAPEH</th>
              <th>Reading</th>
              <th>Total</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {mpsData.length === 0 && (
              <tr>
                <td colSpan={14} className="p-4 text-gray-500">
                  No MPS data yet
                </td>
              </tr>
            )}

            {mpsData.map((row) => (
              <tr key={row.id} className="border-b">
                <td>{row.grade_level.toUpperCase()}</td>
                <td>{row.section.toUpperCase()}</td>
                <td>{row.gmrc}</td>
                <td>{row.epp}</td>
                <td>{row.filipino}</td>
                <td>{row.english}</td>
                <td>{row.math}</td>
                <td>{row.science}</td>
                <td>{row.ap}</td>
                <td>{row.mapeh}</td>
                <td>{row.reading_literacy}</td>
                <td>100</td>
                <td>{row.link}</td>
                <td>
                  <button
                    onClick={() => setEditingRow(row)}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row)}
                    disabled={deletingId === row.id}
                    className="text-red-600 underline disabled:opacity-50"
                  >
                    {deletingId === row.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
