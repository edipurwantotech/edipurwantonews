import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
            include: {
                _count: {
                    select: { blogs: true },
                },
            },
        });

      

        return NextResponse.json(categories);
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Failed to fetch categories: " + error },
            { status: 500 }
        );
    }
}
