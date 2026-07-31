import { listAllJobs } from '@/lib/db/queries';
import { JOB_OPENINGS } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { JobsCrud } from '@/components/admin/JobsCrud';

export default async function AdminJobsPage() {
  const fromDb = await listAllJobs();
  const jobs =
    fromDb ??
    JOB_OPENINGS.map((j) => ({
      id: j.id,
      locale: 'fr',
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      summary: j.summary,
      responsibilities: j.responsibilities,
      requirements: j.requirements,
      published: true,
    }));

  return <JobsCrud jobs={jobs} dbOk={isDbConfigured()} />;
}
