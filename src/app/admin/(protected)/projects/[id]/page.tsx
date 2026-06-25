"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProject } from "@/lib/admin/projects";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    if (id) getProject(id).then(setProject);
  }, [id]);

  if (project === undefined) return <div className="center-screen">Loading…</div>;
  if (project === null)
    return (
      <div>
        <h1>Not found</h1>
        <p className="admin-sub">That project doesn&apos;t exist.</p>
      </div>
    );

  return (
    <div>
      <h1>Edit project</h1>
      <p className="admin-sub" style={{ marginBottom: 24 }}>
        {project.title}
      </p>
      <ProjectForm initial={project} />
    </div>
  );
}
