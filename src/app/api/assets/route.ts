import { NextResponse } from 'next/server';
import assetsData from '@/data/assets.json';

export async function GET() {
  try {
    // Return the asset data with proper headers
    return NextResponse.json(assetsData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}
