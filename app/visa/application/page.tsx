import { db } from "@/db/index";

import { country } from "@/db/schema";
import { eq } from "drizzle-orm";

import VisaAssessmentForm from "@/components/VisaApplication";

export default async function VisaPage() {
  // Query the database for countries
  const countriesData = await db.select().from(country).orderBy(country.name);

  // Render the client form, passing the countries as props
  return (
    <div>
      <VisaAssessmentForm countries={countriesData} />
    </div>
  );
}
