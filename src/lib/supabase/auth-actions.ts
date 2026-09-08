"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "./server";

type ActionResult =
  | { error: string }
  | { success: true }
  | { needsConfirmation: true };

const GENERIC_ERROR = "Something went wrong. Please try again.";

async function getOrigin(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

function safeNext(next?: string | null): string {
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/dashboard/flight";
}

export async function signUpAction(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const origin = await getOrigin();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          name: `${firstName} ${lastName}`.trim(),
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) return { error: error.message };
    if (!data.session) return { needsConfirmation: true };
    return { success: true };
  } catch {
    return { error: GENERIC_ERROR };
  }
}

export async function signInAction(
  email: string,
  password: string,
  next?: string | null
): Promise<{ error: string } | undefined> {
  let result: { error: string } | undefined;
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) result = { error: error.message };
  } catch {
    result = { error: GENERIC_ERROR };
  }

  if (result) return result;
  redirect(safeNext(next));
}

export async function signOutAction(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore — we redirect to /login regardless
  }
  redirect("/login");
}

export async function requestPasswordResetAction(
  email: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const origin = await getOrigin();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/forgottenPassword/reset`,
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: GENERIC_ERROR };
  }
}

export async function updatePasswordAction(
  newPassword: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: GENERIC_ERROR };
  }
}
