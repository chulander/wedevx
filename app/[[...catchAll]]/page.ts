// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CatchAllParams {
  params: Promise<{ catchAll?: string[] }>;
}

export default async function CatchAllPage({ params }: CatchAllParams) {
  const { catchAll } = await params;

  // Attempted path reconstruction
  const attemptedPath = catchAll ? catchAll.join("/") : null;
  if (attemptedPath) {
    console.info(`User tried to access: /${attemptedPath}`);
  }

  // redirect("/visa-applications");

  return null; // This will never be reached due to `redirect`, but is required for TypeScript.
}
