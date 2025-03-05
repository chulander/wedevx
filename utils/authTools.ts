import "server-only";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/db/index";
import { eq, and } from "drizzle-orm";
import { users } from "@/db/schema";
import { ID_TOKEN_NAME, TOKEN_SECRET } from "./constants";
import { z } from "zod";

// Compare passwords
const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};
const createAccessToken = (userId: string) => {
  const token = jwt.sign({ sub: userId }, TOKEN_SECRET);
  return token;
};

const createIdToken = ({
  id,
  email,
  first_name,
  last_name,
}: {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}) => {
  const token = jwt.sign(
    { sub: id, email, first_name, last_name },
    TOKEN_SECRET,
  );
  return token;
};

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function getUserFromToken(): Promise<{
  id: string;
  email: string;
} | null> {
  const cookieStore = await cookies();
  const idToken = cookieStore.get(ID_TOKEN_NAME)?.value;

  if (!idToken) {
    return null;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(idToken, TOKEN_SECRET) as {
      sub: string;
      email: string;
    };
    const { sub: id, email } = decoded;
    const user = await db.query.users.findFirst({
      where: and(eq(users.id, id), eq(users.email, email)),
      columns: {
        id: true,
        email: true,
      },
    });
    if (!user) {
      throw new Error("User not found.");
    } else if (user.email !== email && user.id !== id) {
      throw new Error("Invalid user.");
    }
    return { id, email }; // Assuming the userId is stored in the `id` field
  } catch (error) {
    console.error("Error decoding id_token:", error);
    return null;
  }
}

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Step 1: Check if the user exists
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Step 2: Verify the password
  const isPasswordCorrect = await comparePW(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
  }

  // Step 3: Generate tokens
  const access_token = createAccessToken(user.id);
  const id_token = createIdToken(user);

  return { user, access_token, id_token };
};
