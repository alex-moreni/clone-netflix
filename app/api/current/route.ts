import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
