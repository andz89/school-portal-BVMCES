"use client";

import { useState } from "react";
import { createUser } from "./actions";

export default function UserForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "visitor",
    grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If role changes and is NOT editor, clear grade
    if (name === "role" && value !== "editor") {
      setForm({
        ...form,
        role: value,
        grade: "",
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await createUser(form);

    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("User created successfully");
      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "visitor",
        grade: "",
      });
    }

    setLoading(false);
  };

  return (
    <div className=" mx-auto mt-5 w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Create User</h2>
        <p className="text-sm text-gray-500">Add a new user to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        {/* Full name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm p-2 border border-gray-300 text-sm focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm p-2 border border-gray-300 text-sm focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temporary password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm p-2 border border-gray-300 text-sm focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm p-2 border border-gray-300 text-sm focus:outline-none"
          >
            <option value="visitor">Visitor</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Grade – only show for editor */}
        {form.role === "editor" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-sm p-2 border border-gray-300 text-sm focus:outline-none"
            >
              <option value="">Select grade</option>
              <option value="grade-1">Grade 1</option>
              <option value="grade-2">Grade 2</option>
              <option value="grade-3">Grade 3</option>
              <option value="grade-4">Grade 4</option>
              <option value="grade-5">Grade 5</option>
              <option value="grade-6">Grade 6</option>
              <option value="implementation">Implementation</option>
            </select>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create User"}
          </button>

          {message && (
            <span
              className={`text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
