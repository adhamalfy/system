import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      const product = await prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    }
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, wholesalePrice, customerPrice, quantity } =
      await request.json();
    const product = await prisma.product.create({
      data: {
        name,
        wholesalePrice,
        customerPrice,
        quantity,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, wholesalePrice, customerPrice, quantity } =
      await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        wholesalePrice,
        customerPrice,
        quantity,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const product = await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = {
  runtime: "edge",
};
