import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const GET = async (req: Request, res: Response) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const amount = searchParams.get("amount") || undefined;
  const take = (amount !== undefined && !isNaN(parseInt(amount))) ? parseInt(amount) : 10;

  const topScores = await prisma.result.findMany({
    take,
    orderBy: {
      score: "desc",
    },
  });

  return NextResponse.json(topScores);
};

