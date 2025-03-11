import { NextResponse } from 'next/server';
import type { ImageTo3DRequest, MeshyResponse } from '@/lib/types/meshy';

export async function POST(request: Request) {
  try {
    const body: ImageTo3DRequest = await request.json();
    const apiKey = process.env.MESHY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Meshy API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.meshy.ai/openapi/v1/image-to-3d', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: body.image_url,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Meshy API error: ${error}` },
        { status: response.status }
      );
    }

    const data: MeshyResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 