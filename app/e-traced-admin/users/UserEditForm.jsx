"use client";

import { useState } from "react";
import { updateUser } from "./actions";

export default function UserEditForm({ user }) {
  const [form, setForm] = useState({
    fullName: user.full_name ?? "",
    email: user.email ?? "",
    password: "",
    role: user.role ?? "visitor",
    grade: user.grade ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role" && value !== "editor") {
      setForm({ ...form, role: value, grade: "" });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await updateUser(user.id, form);

    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("User updated successfully");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto mt-5 w-[400px] bg-white border rounded-lg shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Edit User</h2>
        <p className="text-sm text-gray-500">Update user details</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        {/* Full name */}
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border p-2 text-sm"
          required
        />

        {/* Email  */}

        <label className="text-sm font-medium">
          Email{" "}
          <span className="text-xs text-gray-500">
            *Changing this will update the user’s login email.
          </span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 text-sm"
        />

        {/* Password (optional) */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New password (optional)"
          className="w-full border p-2 text-sm"
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 text-sm"
        >
          <option value="visitor">Visitor</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        {/* Grade */}
        {form.role === "editor" && (
          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            required
            className="w-full border p-2 text-sm"
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
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 text-sm rounded"
        >
          {loading ? "Updating…" : "Update User"}
        </button>

        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
