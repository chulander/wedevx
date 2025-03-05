// app/(admin)/dashboard/leads/page.tsx
import { db } from "@/db/index";
import { visa_applications, country } from "@/db/schema";
import LeadsTable from "@/components/LeadsTable";
import { eq, SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    status?: string;
    page?: string;
  };
}

export const metadata = {
  title: "Admin Dashboard - Leads",
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const pageSize = 8;
  const page = parseInt(params.page ?? "1", 10);
  const offset = (page - 1) * pageSize;

  const searchTerm = params.search ?? "";
  const statusFilter = params.status ?? "";

  // Build an array of SQL conditions.
  const conditions: SQL[] = [];
  if (searchTerm) {
    // Filter by first_name OR country.name
    conditions.push(
      sql`(${visa_applications.first_name} LIKE ${`%${searchTerm}%`} OR ${country.name} LIKE ${`%${searchTerm}%`})`,
    );
  }
  if (statusFilter) {
    conditions.push(eq(visa_applications.status_id, statusFilter));
  }

  const whereCondition: SQL | undefined =
    conditions.length > 0
      ? conditions.reduce((prev, curr) => sql`${prev} AND ${curr}`)
      : undefined;

  const totalCountResult = await db
    .select({ count: sql`COUNT(${visa_applications.id})` })
    .from(visa_applications)
    .leftJoin(country, eq(visa_applications.citizenship_id, country.id))
    .where(whereCondition);
  const total = Number(totalCountResult[0]?.count) || 0;
  const totalPages = Math.ceil(total / pageSize);

  const leads = await db
    .select({
      id: visa_applications.id,
      first_name: visa_applications.first_name,
      last_name: visa_applications.last_name,
      created_at: visa_applications.created_at,
      status_id: visa_applications.status_id,
      countryName: country.name,
    })
    .from(visa_applications)
    .leftJoin(country, eq(visa_applications.citizenship_id, country.id))
    .where(whereCondition)
    .limit(pageSize)
    .offset(offset);

  // Transform the data for the client component.
  const leadsData = leads.map((lead) => ({
    id: lead.id,
    name: `${lead.first_name} ${lead.last_name}`,
    submitted: new Date(lead.created_at ?? "").toLocaleString(),
    status: lead.status_id || "PENDING",
    country: lead.countryName || "UNKNOWN",
  }));

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Leads</h1>
      <LeadsTable
        data={leadsData}
        page={page}
        totalPages={totalPages}
        search={searchTerm}
        status={statusFilter}
      />
    </div>
  );
}
