import { db } from "@/db/index";

import { country, visa_category } from "@/db/schema";

import VisaApplicationForm from "@/components/VisaApplicationForm";

export default async function VisaPage() {
  // Query the database for countries
  const visaCountries = await db.select().from(country).orderBy(country.name);
  const visaCategories = await db
    .select()
    .from(visa_category)
    .orderBy(visa_category.id);

  // Render the client form, passing the countries as props
  return (
    <VisaApplicationForm
      categories={visaCategories}
      countries={visaCountries}
    />
  );
}
