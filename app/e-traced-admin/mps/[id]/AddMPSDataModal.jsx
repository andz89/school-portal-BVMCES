"use client";

import { useState, useEffect } from "react";
import { createMPSData } from "../actions";
import { createOrUpdateMPSData } from "../actions";

export default function AddMPSDataModal({ mpsId, editingData, onClose }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingData) setOpen(true);
  }, [editingData]);
  async function handleSubmit(formData) {
    setLoading(true);
    try {
      await createOrUpdateMPSData(formData);
      setOpen(false);

      onClose?.();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  const inputClass = "w-full border px-3 py-2 rounded";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add MPS Data
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px] space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">Add MPS Data</h2>

            <form action={handleSubmit} className="space-y-3">
              <input type="hidden" name="mps_description_id" value={mpsId} />

              <input
                defaultValue={editingData?.grade_level || ""}
                name="grade_level"
                placeholder="Grade Level"
                required
                className={inputClass}
              />
              <input
                defaultValue={editingData?.section || ""}
                name="section"
                placeholder="Section"
                required
                className={inputClass}
              />

              <input
                defaultValue={editingData?.gmrc || 0}
                name="gmrc"
                type="number"
                placeholder="GMRC"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.epp || 0}
                name="epp"
                type="number"
                placeholder="EPP"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.filipino || 0}
                name="filipino"
                type="number"
                placeholder="Filipino"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.english || 0}
                name="english"
                type="number"
                placeholder="English"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.math || 0}
                name="math"
                type="number"
                placeholder="Math"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.science || 0}
                name="science"
                type="number"
                placeholder="Science"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.ap || 0}
                name="ap"
                type="number"
                placeholder="AP"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.mapeh || 0}
                name="mapeh"
                type="number"
                placeholder="MAPEH"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.reading_literacy || 0}
                name="reading_literacy"
                type="number"
                placeholder="Reading Literacy"
                className={inputClass}
              />
              <input
                defaultValue={editingData?.link || ""}
                name="link"
                type="link"
                placeholder="LInk"
                className={inputClass}
              />
              {editingData && (
                <input type="hidden" name="id" value={editingData.id} />
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
