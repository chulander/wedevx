import { db } from "@/db/index";

import { country, visa_category } from "@/db/schema";

import Hero from "@/components/Hero";
import VisaAssessmentForm from "@/components/VisaApplication";
import VisaCategories from "@/components/VisaCategories";
import VisaDetails from "@/components/VisaDetails";
import FileUpload from "@/components/FileUpload";

export default async function VisaPage() {
  // Query the database for countries
  const countriesData = await db.select().from(country).orderBy(country.name);
  const visaCategoriesData = await db
    .select()
    .from(visa_category)
    .orderBy(visa_category.id);

  // Render the client form, passing the countries as props
  return (
    <div className="">
      <Hero />
      <VisaAssessmentForm countries={countriesData} />
      <VisaCategories categories={visaCategoriesData} />
      <VisaDetails />
      <FileUpload />
    </div>
  );
}
