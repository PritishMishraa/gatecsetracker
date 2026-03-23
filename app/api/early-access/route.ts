import { NextResponse } from "next/server";
import db from "@/db";
import { waitlistTable } from "@/db/schema";
import {
  type EarlyAccessSubmission,
  normalizeEarlyAccessSubmission,
} from "@/lib/early-access";

export async function POST(request: Request) {
  let body: EarlyAccessSubmission;

  try {
    body = (await request.json()) as EarlyAccessSubmission;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  let submission;

  try {
    submission = normalizeEarlyAccessSubmission(body);
  } catch (error) {
    if (error instanceof Error && error.message) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    await db
      .insert(waitlistTable)
      .values(submission)
      .onConflictDoNothing({ target: waitlistTable.email });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save early access submission", error);

    return NextResponse.json(
      { error: "Could not save your early access request." },
      { status: 500 },
    );
  }
}
