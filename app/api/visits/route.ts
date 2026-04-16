import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!redis) {
      return NextResponse.json({ visits: null, error: "Redis not configured" }, { status: 500 });
    }
    
    // Increment the counter
    const visits = await redis.incr("total_visits");
    return NextResponse.json({ visits });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ visits: null, error: "Redis connection failed" }, { status: 500 });
  }
}
