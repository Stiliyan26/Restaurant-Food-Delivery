import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

interface PutProps {
  params: {
    id: string
  }
}

export const PUT = async (req: NextRequest,{ params }: PutProps) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id
      },
      data: {
        status: body
      }
    })

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}