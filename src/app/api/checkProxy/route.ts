import { NextResponse } from "next/server";
import { checkProxies } from "@/lib/proxyCheck";
import { CheckRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { proxies, timeout, concurrent }: CheckRequest = await request.json();

    if (!proxies || !Array.isArray(proxies)) {
      return NextResponse.json(
        { error: "Invalid proxy list" },
        { status: 400 }
      );
    }

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    checkProxies(proxies, { timeout, concurrent }, (result) => {
      writer.write(encoder.encode(`data: ${JSON.stringify(result)}\n\n`));
    }).finally(() => writer.close());

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Proxy check failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
