import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { clickId } = await req.json();
    
    // Get IP address from headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown';
    
    // Get User Agent
    const ua = req.headers.get('user-agent') || 'unknown';
    
    const { error } = await supabase
      .from('visitors')
      .insert([
        { 
          ip_address: ip, 
          user_agent: ua, 
          click_id: clickId || null 
        }
      ]);

    if (error) {
      console.error('Error logging visitor:', error);
      return NextResponse.json({ error: 'Failed to log visitor' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
