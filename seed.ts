// seed.ts
import { db } from "@/db/index"; // Adjust the path if necessary
import { visa_category } from "@/db/schema"; // Adjust the path if necessary

async function seedVisaCategories() {
  const categories = [
    {
      name: "O-1",
      description: "Visa for individuals with extraordinary ability.",
    },
    {
      name: "EB-1A",
      description: "Employment-based visa for extraordinary ability.",
    },
    {
      name: "EB-2 NIW",
      description:
        "Employment-based visa for professionals with advanced degrees (National Interest Waiver).",
    },
    {
      name: "UNKNOWN",
      description: "Unspecified category.",
    },
  ];

  await db.insert(visa_category).values(categories);
  console.log("Visa categories seeded successfully.");
}

seedVisaCategories()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding visa categories:", err);
    process.exit(1);
  });
