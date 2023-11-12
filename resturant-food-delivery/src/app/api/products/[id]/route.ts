import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string
  }
}
//GET SINGLE PRODUCT
export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    });

    return new NextResponse(
      JSON.stringify(product),
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

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const session = await getAuthSession();

  if (!session?.user.isAdmin) {
    return new NextResponse(JSON.stringify({ message: 'You are not allowed!' }), { status: 403 });
  }

  try {
    await prisma.product.delete({
      where: {
        id
      }
    });

    return new NextResponse(JSON.stringify("Product has been deleted!"), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}