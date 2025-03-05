// seed_fake_applications.ts
import { db } from "@/db/index";
import { visa_applications } from "@/db/schema";
import { randomUUID } from "crypto";

async function seedVisaApplications() {
  const applications = [];

  for (let i = 1; i <= 100; i++) {
    applications.push({
      id: randomUUID(),
      first_name: `TestFirst_${i}`,
      last_name: `TestLast_${i}`,
      email: `test_${i}@example.com`,
      additional_details: `Test details for application ${i}.`,
      status_id: "PENDING", // ensure this exists in your status table
      citizenship_id: "US", // ensure "US" exists in your country table
      website: "https://example.com", // added website field
      resume_blob: "", // for testing, we leave it empty
      resume_file_type: "application/pdf",
      resume_file_name: "test.pdf",
      // created_at and updated_at will be set by default functions
    });
  }

  await db.insert(visa_applications).values(applications);
  console.log("Inserted 100 test visa applications.");
}

seedVisaApplications()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding visa applications:", err);
    process.exit(1);
  });
