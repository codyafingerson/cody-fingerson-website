'use client';

import { useState, useEffect, FormEvent } from "react";
import Modal from "@/components/Modal";
import {
  getAllTools,
  createTool,
  editTool,
  deleteTool,
} from "@/app/actions/toolActions";
import { ToolCategory } from "../../../../generated/prisma";
import { FaPlus } from "react-icons/fa";
import SubContainer from "@/components/SubContainer";

export type Tool = {
  id: string;
  name: string;
  category: ToolCategory;
  proficiency: number | null;
  url: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// grab the enum values directly
const TOOL_CATEGORIES = Object.values(ToolCategory) as ToolCategory[];

export default function ToolAdminPage() {
  // new‐tool state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ToolCategory>(TOOL_CATEGORIES[0]);
  const [newProficiency, setNewProficiency] = useState<number | "">("");
  const [newUrl, setNewUrl] = useState("");
  const [newIcon, setNewIcon] = useState("");

  // edit‐tool state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState<ToolCategory>(TOOL_CATEGORIES[0]);
  const [editProficiency, setEditProficiency] = useState<number | "">("");
  const [editUrl, setEditUrl] = useState("");
  const [editIcon, setEditIcon] = useState("");

  // common
  const [tools, setTools] = useState<Tool[]>([]);
  const [error, setError] = useState("");

  // load all tools
  useEffect(() => {
    (async () => {
      const res = await getAllTools();
      if ("error" in res) {
        setError(res.error);
      } else {
        setTools(res as Tool[]);
      }
    })();
  }, []);

  // create new
  const handleNewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await createTool({
      name: newName,
      category: newCategory,
      proficiency: typeof newProficiency === "number" ? newProficiency : null,
      url: newUrl || null,
      icon: newIcon || null,
    });
    if ("error" in res) {
      setError(res.error);
    } else {
      setIsNewModalOpen(false);
      setNewName("");
      setNewCategory(TOOL_CATEGORIES[0]);
      setNewProficiency("");
      setNewUrl("");
      setNewIcon("");
      const updated = await getAllTools();
      if (!("error" in updated)) setTools(updated);
    }
  };

  // open edit modal & prefill
  const openEdit = (tool: Tool) => {
    setEditId(tool.id);
    setEditName(tool.name);
    setEditCategory(tool.category);
    setEditProficiency(tool.proficiency ?? "");
    setEditUrl(tool.url ?? "");
    setEditIcon(tool.icon ?? "");
    setError("");
    setIsEditModalOpen(true);
  };

  // submit edit
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    setError("");
    const res = await editTool(editId, {
      name: editName,
      category: editCategory,
      proficiency: typeof editProficiency === "number" ? editProficiency : null,
      url: editUrl || null,
      icon: editIcon || null,
    });
    if ("error" in res) {
      setError(res.error);
    } else {
      setIsEditModalOpen(false);
      setEditId(null);
      const updated = await getAllTools();
      if (!("error" in updated)) setTools(updated);
    }
  };

  // delete
  const handleDelete = async (id: string) => {
    await deleteTool(id);
    setTools(tools.filter((t) => t.id !== id));
  };

  return (
    <>
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tool Admin</h1>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 rounded-lg text-white cursor-pointer"
        >
          <FaPlus className="mr-2" /> Add New Tool
        </button>
      </div>

      {/* New Tool Modal */}
      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)}>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">New Tool</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleNewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ToolCategory)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {TOOL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Proficiency (1–10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={newProficiency}
                onChange={(e) =>
                  setNewProficiency(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Icon URL</label>
              <input
                type="url"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit Tool Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Edit Tool</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as ToolCategory)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {TOOL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Proficiency (1–10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={editProficiency}
                onChange={(e) =>
                  setEditProficiency(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">URL</label>
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Icon URL</label>
              <input
                type="url"
                value={editIcon}
                onChange={(e) => setEditIcon(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* tool grid */}
      <section className="mt-10">
        {tools.length === 0 ? (
          <p className="text-center text-gray-500">No tools yet. Click “Add New Tool.”</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {tool.icon && (
                    <img src={tool.icon} alt={`${tool.name} icon`} className="w-6 h-6 mr-2" />
                  )}
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                </div>
                <p className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">
                  {tool.category}
                </p>
                {tool.proficiency != null && (
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Proficiency: {tool.proficiency}/10
                  </p>
                )}
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm mb-4"
                  >
                    Visit
                  </a>
                )}
                <div className="mt-auto flex space-x-4">
                  <button
                    onClick={() => openEdit(tool)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
