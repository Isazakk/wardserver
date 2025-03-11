import { NextResponse } from 'next/server';
import type { TextTo3DRequest } from '@/lib/types/meshy';

if (!process.env.MESHY_API_KEY) {
  throw new Error('Missing MESHY_API_KEY environment variable');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body as TextTo3DRequest;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.meshy.ai/v2/text-to-3d', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MESHY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to generate 3D model' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating 3D model:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 