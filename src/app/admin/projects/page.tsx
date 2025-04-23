'use client';

import { useState, useEffect, FormEvent } from "react";
import Modal from "@/components/Modal";
import { getAllProjects, createProject, deleteProject, editProject } from "@/app/actions/projectActions";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  sourceCode: string | null;
  liveDemo: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProjectAdminPage() {
  // new‐project state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTechnologies, setNewTechnologies] = useState<string[]>([]);
  const [newSourceCode, setNewSourceCode] = useState("");
  const [newLiveDemo, setNewLiveDemo] = useState("");

  // edit‐project state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTechnologies, setEditTechnologies] = useState<string[]>([]);
  const [editSourceCode, setEditSourceCode] = useState("");
  const [editLiveDemo, setEditLiveDemo] = useState("");

  // common
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  // load all projects
  useEffect(() => {
    (async () => {
      const res = await getAllProjects();
      if ("error" in res) {
        setError(res.error);
      } else {
        setProjects(res as Project[]);
      }
    })();
  }, []);

  // create new
  const handleNewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await createProject({
      title: newTitle,
      description: newDescription,
      technologies: newTechnologies,
      sourceCode: newSourceCode,
      liveDemo: newLiveDemo,
    });
    if ("error" in res) {
      setError(res.error);
    } else {
      setIsNewModalOpen(false);
      setNewTitle("");
      setNewDescription("");
      setNewTechnologies([]);
      setNewSourceCode("");
      setNewLiveDemo("");
      // refresh
      const updated = await getAllProjects();
      if (!("error" in updated)) setProjects(updated);
    }
  };

  // open edit modal & prefill
  const openEdit = (proj: Project) => {
    setEditId(proj.id);
    setEditTitle(proj.title);
    setEditDescription(proj.description);
    setEditTechnologies(proj.technologies);
    setEditSourceCode(proj.sourceCode ?? "");
    setEditLiveDemo(proj.liveDemo ?? "");
    setError("");
    setIsEditModalOpen(true);
  };

  // submit edit
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    setError("");
    const res = await editProject(editId, {
      title: editTitle,
      description: editDescription,
      technologies: editTechnologies,
      sourceCode: editSourceCode || null,
      liveDemo: editLiveDemo || null,
    });
    if ("error" in res) {
      setError(res.error);
    } else {
      setIsEditModalOpen(false);
      setEditId(null);
      // refresh
      const updated = await getAllProjects();
      if (!("error" in updated)) setProjects(updated);
    }
  };

  // delete
  const handleDelete = async (id: string) => {
    await deleteProject(id );
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <>
        {/* header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Admin</h1>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 rounded-lg text-white"
          >
            <FaPlus className="mr-2" /> Add New Project
          </button>
        </div>

        {/* New Project Modal */}
        <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">New Project</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleNewSubmit} className="space-y-4">
              {/* title */}
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* description */}
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* technologies */}
              <div>
                <label className="block text-sm mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={newTechnologies.join(", ")}
                  onChange={(e) =>
                    setNewTechnologies(e.target.value.split(",").map((t) => t.trim()))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* sourceCode */}
              <div>
                <label className="block text-sm mb-1">Source Code URL</label>
                <input
                  type="url"
                  value={newSourceCode}
                  onChange={(e) => setNewSourceCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* liveDemo */}
              <div>
                <label className="block text-sm mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={newLiveDemo}
                  onChange={(e) => setNewLiveDemo(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                 className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit Project Modal */}
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Technologies</label>
                <input
                  type="text"
                  value={editTechnologies.join(", ")}
                  onChange={(e) =>
                    setEditTechnologies(e.target.value.split(",").map((t) => t.trim()))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Source Code URL</label>
                <input
                  type="url"
                  value={editSourceCode}
                  onChange={(e) => setEditSourceCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={editLiveDemo}
                  onChange={(e) => setEditLiveDemo(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none cursor-pointer"
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

        {/* project grid */}
        <section className="mt-10">
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects yet. Click “Add New Project.”</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                  <p className="flex-grow text-gray-700 dark:text-gray-300 mb-4">
                    {proj.description}
                  </p>
                  <div className="mb-4">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-1 mr-2 mb-2 rounded-full bg-indigo-100 dark:bg-indigo-200 text-indigo-800 dark:text-indigo-900 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="space-x-2">
                      {proj.sourceCode && (
                        <Link href={proj.sourceCode} target="_blank" className="underline text-sm">
                          Code
                        </Link>
                      )}
                      {proj.liveDemo && (
                        <Link href={proj.liveDemo} target="_blank" className="underline text-sm">
                          Live
                        </Link>
                      )}
                    </div>
                    <div className="space-x-4">
                      <button
                        onClick={() => openEdit(proj)}
                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="text-red-600 hover:underline text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
    </>
  );
}
