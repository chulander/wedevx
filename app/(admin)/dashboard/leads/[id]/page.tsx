// app/(admin)/dashboard/[id]/page.tsx
import { db } from "@/db/index";
import { visa_applications, country, status } from "@/db/schema";
import { eq } from "drizzle-orm";

import VisaSubmission from "@/components/VisaSubmission";
interface LeadDetailPageProps {
  params: { id: string };
}

export const metadata = {
  title: "Lead Detail",
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  console.log("id", id);

  // Query the lead details, joining with the country table for the country name.
  const leadData = await db
    .select({
      id: visa_applications.id,
      first_name: visa_applications.first_name,
      last_name: visa_applications.last_name,
      email: visa_applications.email,
      additional_details: visa_applications.additional_details,
      status_id: visa_applications.status_id,
      citizenship_id: visa_applications.citizenship_id,
      created_at: visa_applications.created_at,
      countryName: country.name,
    })
    .from(visa_applications)
    .leftJoin(country, eq(visa_applications.citizenship_id, country.id))
    .where(eq(visa_applications.id, id))
    .limit(1);

  if (leadData.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Lead Not Found</h1>
        <p>The requested lead could not be found.</p>
      </div>
    );
  }

  const lead = leadData[0];

  return (
    <VisaSubmission
      id={lead.id}
      first_name={lead.first_name}
      last_name={lead.last_name}
      email={lead.email}
      additional_details={lead.additional_details}
      status_id={lead.status_id}
      countryName={lead.countryName!}
      created_at={lead.created_at}
    />
  );
}
