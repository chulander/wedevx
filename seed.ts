// seed.ts
import { db } from "@/db/index"; // Adjust the path if necessary
import { visa_category, country, status } from "@/db/schema"; // Adjust the path if necessary
import { eq } from "drizzle-orm";

async function seedVisaCategories() {
  const categories = [
    {
      id: "O-1",
      description: "Visa for individuals with extraordinary ability.",
    },
    {
      id: "EB-1A",
      description: "Employment-based visa for extraordinary ability.",
    },
    {
      id: "EB-2 NIW",
      description:
        "Employment-based visa for professionals with advanced degrees (National Interest Waiver).",
    },
    {
      id: "UNKNOWN",
      description: "Applicant is unsure of the visa category.",
    },
  ];

  // Check if the table is empty
  const existingCategories = await db.select().from(visa_category);
  if (existingCategories.length === 0) {
    await db.insert(visa_category).values(categories);
    console.log("Bulk inserted visa categories.");
  } else {
    for (const category of categories) {
      const existing = await db
        .select()
        .from(visa_category)
        .where(eq(visa_category.name, category.name));
      if (existing.length === 0) {
        await db.insert(visa_category).values(category);
        console.log(`Inserted visa category: ${category.name}`);
      } else {
        console.log(`Skipped visa category: ${category.name} (already exists)`);
      }
    }
  }
}

async function seedStatuses() {
  const statuses = [
    {
      id: "PENDING",
      description: "Application is pending review.",
    },
    {
      id: "REACHED_OUT",
      description: "Application was notified or reached out to.",
    },
  ];

  const existingStatuses = await db.select().from(status);
  if (existingStatuses.length === 0) {
    await db.insert(status).values(statuses);
    console.log("Bulk inserted statuses.");
  } else {
    for (const s of statuses) {
      const existing = await db
        .select()
        .from(status)
        .where(eq(status.id, s.id));
      if (existing.length === 0) {
        await db.insert(status).values(s);
        console.log(`Inserted status: ${s.id}`);
      } else {
        console.log(`Skipped status: ${s.id} (already exists)`);
      }
    }
  }
}

async function seedCountries() {
  const countriesData = [
    { id: "US", name: "United States" },
    { id: "CN", name: "China" },
    { id: "IN", name: "India" },
    { id: "ID", name: "Indonesia" },
    { id: "PK", name: "Pakistan" },
    { id: "BR", name: "Brazil" },
    { id: "NG", name: "Nigeria" },
    { id: "BD", name: "Bangladesh" },
    { id: "RU", name: "Russia" },
    { id: "MX", name: "Mexico" },
    { id: "JP", name: "Japan" },
    { id: "ET", name: "Ethiopia" },
    { id: "PH", name: "Philippines" },
    { id: "EG", name: "Egypt" },
    { id: "VN", name: "Vietnam" },
    { id: "CD", name: "DR Congo" },
    { id: "TR", name: "Turkey" },
    { id: "IR", name: "Iran" },
    { id: "DE", name: "Germany" },
    { id: "TH", name: "Thailand" },
    { id: "GB", name: "United Kingdom" },
    { id: "FR", name: "France" },
    { id: "IT", name: "Italy" },
    { id: "ZA", name: "South Africa" },
    { id: "TZ", name: "Tanzania" },
    { id: "MM", name: "Myanmar" },
    { id: "KR", name: "South Korea" },
    { id: "CO", name: "Colombia" },
    { id: "KE", name: "Kenya" },
    { id: "ES", name: "Spain" },
    { id: "AR", name: "Argentina" },
    { id: "DZ", name: "Algeria" },
    { id: "SD", name: "Sudan" },
    { id: "UA", name: "Ukraine" },
    { id: "UG", name: "Uganda" },
    { id: "IQ", name: "Iraq" },
    { id: "PL", name: "Poland" },
    { id: "CA", name: "Canada" },
    { id: "MA", name: "Morocco" },
    { id: "SA", name: "Saudi Arabia" },
    { id: "UZ", name: "Uzbekistan" },
    { id: "PE", name: "Peru" },
    { id: "AO", name: "Angola" },
    { id: "MY", name: "Malaysia" },
    { id: "MZ", name: "Mozambique" },
    { id: "GH", name: "Ghana" },
    { id: "YE", name: "Yemen" },
    { id: "NP", name: "Nepal" },
    { id: "VE", name: "Venezuela" },
    { id: "MG", name: "Madagascar" },
    { id: "CM", name: "Cameroon" },
    { id: "CI", name: "Côte d'Ivoire" },
    { id: "KP", name: "North Korea" },
    { id: "AU", name: "Australia" },
    { id: "NE", name: "Niger" },
    { id: "TW", name: "Taiwan" },
    { id: "LK", name: "Sri Lanka" },
    { id: "BF", name: "Burkina Faso" },
    { id: "ML", name: "Mali" },
    { id: "RO", name: "Romania" },
    { id: "CL", name: "Chile" },
    { id: "KZ", name: "Kazakhstan" },
    { id: "MW", name: "Malawi" },
    { id: "SY", name: "Syria" },
    { id: "GT", name: "Guatemala" },
    { id: "EC", name: "Ecuador" },
    { id: "NL", name: "Netherlands" },
    { id: "SN", name: "Senegal" },
    { id: "KH", name: "Cambodia" },
    { id: "TD", name: "Chad" },
    { id: "SO", name: "Somalia" },
    { id: "ZW", name: "Zimbabwe" },
    { id: "GN", name: "Guinea" },
    { id: "RW", name: "Rwanda" },
    { id: "BJ", name: "Benin" },
    { id: "BI", name: "Burundi" },
    { id: "TN", name: "Tunisia" },
    { id: "BO", name: "Bolivia" },
    { id: "BE", name: "Belgium" },
    { id: "HT", name: "Haiti" },
    { id: "CU", name: "Cuba" },
    { id: "SS", name: "South Sudan" },
    { id: "CZ", name: "Czechia" },
    { id: "GR", name: "Greece" },
    { id: "JO", name: "Jordan" },
    { id: "PT", name: "Portugal" },
    { id: "AZ", name: "Azerbaijan" },
    { id: "SE", name: "Sweden" },
    { id: "HU", name: "Hungary" },
    { id: "BY", name: "Belarus" },
    { id: "AE", name: "United Arab Emirates" },
    { id: "IL", name: "Israel" },
    { id: "CH", name: "Switzerland" },
    { id: "PG", name: "Papua New Guinea" },
    { id: "AT", name: "Austria" },
    { id: "RS", name: "Serbia" },
    { id: "PY", name: "Paraguay" },
    { id: "DK", name: "Denmark" },
    { id: "FI", name: "Finland" },
    { id: "NO", name: "Norway" },
  ];

  const existingCountries = await db.select().from(country);
  if (existingCountries.length === 0) {
    await db.insert(country).values(countriesData);
    console.log("Bulk inserted countries.");
  } else {
    for (const c of countriesData) {
      const existing = await db
        .select()
        .from(country)
        .where(eq(country.id, c.id));
      if (existing.length === 0) {
        await db.insert(country).values(c);
        console.log(`Inserted country: ${c.name}`);
      } else {
        console.log(`Skipped country: ${c.name} (already exists)`);
      }
    }
  }
}

async function main() {
  await seedVisaCategories();
  await seedStatuses();
  await seedCountries();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding data:", err);
    process.exit(1);
  });
