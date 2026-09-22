import React from 'react';
import { Metadata } from 'next';
import { getPublishedProjects } from '@/lib/supabase/queries';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects — High-Voltage Engineering Case Studies & Portfolio',
  description:
    'Review documented electrical engineering case studies by Modes Power Services in Ghana, including industrial substation overhauls, solar microgrids, and healthcare electrical fitouts.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return <ProjectsClient initialProjects={projects} />;
}
