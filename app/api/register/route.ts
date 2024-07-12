import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface User {
  email: string;
  name: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password }: User = body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log("Error in POST /api/register:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
