import { NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase.from('Restaurant').select('*').limit(10)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const body = await req.json()

    // Validate input
    if(!body.name || !body.location || !body.cuisine){
      return NextResponse.json(
        { error: "Fields 'name', 'location', and 'cuisine' are required" }, 
        { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await supabase
    .from('Restaurant')
    .insert([
      { 
        name: body.name,
        location: body.location,
        cuisine: body.cuisine,
      },
    ])
    .select()   // Return inserted row(s)
    .single()   // Expect one row

    // Handle DB error
    if (error) {
      console.error("Supabase error:",error)
      return NextResponse.json(
        { error: error.message }, 
        { status: 500 })
    }

    // Success response (ALWAYS JSON)
    return NextResponse.json(
      { restaurant:data },
      { status: 201}
    );
  } catch (err) {
    console.error("Unhandled POST error:", err);
    return NextResponse.json(
      { error: "Invalid request body or server error" },
      { status: 500 }
    );
  }
} 

export async function PUT(req: Request) {
  const body = await req.json()

  if(!body.id){
    return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('Restaurant')
    .update([
      {
        name: body.name,
        location: body.location,
        cuisine: body.cuisine,
      },
    ])
    .eq('id', body.id)
    .select()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function DELETE(req: Request) {
  const body = await req.json()

  if(!body.id){
    return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('Restaurant')
    .delete()
    .eq('id', body.id)
    .select()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}