"use client";

import { useState } from "react";
import UserForm from "./UserForm";

export default function UserFormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Open button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
      >
        Add User
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative ">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute  top-10  right-3 z-10 bg-red-800 rounded-sm py-1 px-2 text-white hover:bg-red-700  cursor-pointer "
            >
              ✕
            </button>

            <UserForm />
          </div>
        </div>
      )}
    </>
  );
}
