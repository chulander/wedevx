// app/(admin)/dashboard/page.tsx
import { db } from "@/db/index"; // or your DB logic
import { visa_applications } from "@/db/schema"; // example table
import LeadsTable from "@/components/LeadsTable";

export default async function DashboardPage() {
  // Example: fetch leads from DB or an API
  const leads = await db.select().from(visa_applications).limit(10);

  // Transform the data as needed for the table
  // For example, map to { id, name, submittedAt, status, country }
  const leadsData = leads.map((lead) => ({
    id: lead.id,
    name: `${lead.first_name} ${lead.last_name}`,
    submitted: new Date(lead.created_at).toLocaleString(),
    status: "Pending", // or lead.status_id, etc.
    country: "Mexico", // or lead.citizenship_id, etc.
  }));

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-4 text-2xl font-bold">Leads</h1>
      <LeadsTable data={leadsData} />
    </div>
  );
}
