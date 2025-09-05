import { NextRequest, NextResponse } from 'next/server';
import assetsData from '@/data/assets.json';
import { AssetsApiResponse } from '@/lib/types';
import { processAssetsWithDepreciation } from '@/lib/calculations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Calculate depreciation for each asset
    const assetsWithDepreciation = processAssetsWithDepreciation(assetsData, dateParam);

    const response: AssetsApiResponse = {
      assets: assetsWithDepreciation,
      calculationDate: dateParam,
    };

    return NextResponse.json(response, {
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
