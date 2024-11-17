import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const POST = async (req: Request, res: Response) => {
  const { name, score, reactionTime } = await req.json();

  if (!name || !score || !reactionTime) return NextResponse.json({}, { statusText: "Required parameters not provided!" });

  const result = await prisma.result.create({
    data: {
      name,
      score,
      reactionTime,
    }
  });

  return NextResponse.json(result, { status: 201 });
};
