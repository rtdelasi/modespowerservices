import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TeamForm } from '@/components/admin/TeamForm';

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="New Team Member Profile"
        description="Add a staff profile with credentials, photo, and LinkedIn link."
        backHref="/admin/team"
        backLabel="Team"
      />

      <TeamForm />
    </div>
  );
}
