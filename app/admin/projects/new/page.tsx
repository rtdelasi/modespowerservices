import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="New Case Study Project"
        description="Add a new engineering installation or commissioning case study."
        backHref="/admin/projects"
        backLabel="Projects"
      />

      <ProjectForm />
    </div>
  );
}
