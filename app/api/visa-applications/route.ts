import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/index";
import { visa_applications, visa_applications_categories } from "@/db/schema";

// Define a Zod schema for the incoming data
const visaApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please provide a valid email address"),
  additional_details: z.string().min(1, "Additional details are required"),
  status_id: z.string().min(1, "Status is required"),
  citizenship_id: z.string().optional(),
  resume_blob: z.any(), // You may want to adjust this based on how you're sending the blob (e.g., as a base64 string)
  resume_file_type: z.string().min(1, "File type is required"),
  resume_file_name: z.string().min(1, "File name is required"),
  categories: z
    .array(z.number())
    .nonempty("At least one category must be selected"),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the incoming JSON using Zod
    const result = visaApplicationSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 },
      );
    }

    const data = result.data;

    // Insert a new visa application
    const [application] = await db
      .insert(visa_applications)
      .values({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        additional_details: data.additional_details,
        status_id: data.status_id,
        citizenship_id: data.citizenship_id ?? null, // Provide null if undefined
        resume_blob: data.resume_blob,
        resume_file_type: data.resume_file_type,
        resume_file_name: data.resume_file_name,
      })
      .returning();

    // Insert join records for visa categories
    if (data.categories && data.categories.length > 0) {
      for (const catId of data.categories) {
        await db.insert(visa_applications_categories).values({
          visa_application_id: application.id,
          visa_category_id: catId,
        });
      }
    }

    return NextResponse.json(
      { message: "Visa application submitted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting visa application:", error);
    return NextResponse.json(
      { error: "Error submitting visa application." },
      { status: 500 },
    );
  }
}
