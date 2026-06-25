import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1>New project</h1>
      <p className="admin-sub" style={{ marginBottom: 24 }}>
        Add a project to your Selected Work.
      </p>
      <ProjectForm />
    </div>
  );
}
