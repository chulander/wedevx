import { db } from "@/db/index";
import { visa_applications, country } from "@/db/schema";
import LeadsTable from "@/components/LeadsTable";
import { eq, like, SQL } from "drizzle-orm";
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

  // Build array of conditions
  const conditions: SQL[] = [];
  if (searchTerm) {
    conditions.push(
      sql`(${visa_applications.first_name} LIKE ${`%${searchTerm}%`} OR ${country.name} LIKE ${`%${searchTerm}%`})`,
    );
  }
  if (statusFilter) {
    conditions.push(eq(visa_applications.status_id, statusFilter));
  }

  // Combine conditions with AND if they exist
  const whereCondition: SQL | undefined =
    conditions.length > 0
      ? conditions.reduce((prev, curr) => sql`${prev} AND ${curr}`)
      : undefined;

  // Query total count
  const totalCountResult = await db
    .select({ count: sql`COUNT(${visa_applications.id})` })
    .from(visa_applications)
    .leftJoin(country, eq(visa_applications.citizenship_id, country.id))
    .where(whereCondition);
  const total = Number(totalCountResult[0]?.count) || 0;
  const totalPages = Math.ceil(total / pageSize);

  // Query actual rows using limit and offset, joining country to get its name
  const leads = await db
    .select({
      id: visa_applications.id,
      first_name: visa_applications.first_name,
      last_name: visa_applications.last_name,
      created_at: visa_applications.created_at,
      status_id: visa_applications.status_id,
      countryName: country.name, // <-- we alias the country name
    })
    .from(visa_applications)
    .leftJoin(country, eq(visa_applications.citizenship_id, country.id))
    .where(whereCondition)
    .limit(pageSize)
    .offset(offset);

  const leadsData = leads.map((row) => ({
    id: row.id,
    name: `${row.first_name} ${row.last_name}`,
    submitted: new Date(row.created_at ?? "").toLocaleString(),
    status: row.status_id || "PENDING",
    country: row.countryName || "UNKNOWN", // Use the joined name
  }));

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Leads</h1>
      <LeadsTable
        data={leadsData}
        total={total}
        page={page}
        totalPages={totalPages}
        search={searchTerm}
        status={statusFilter}
        pageSize={pageSize}
      />
    </div>
  );
}
