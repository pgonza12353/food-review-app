import { NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabaseClient'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  console.log("API hit: userId =", userId)

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("Review")
    .select("*, restaurant:restaurantId(id, name)")
    .eq("userId", Number(userId))
    .limit(20)

  console.log("Supabase result:", data, error)

  if (error) {
    console.error("Supabase error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}

export async function POST(req: Request) {
  // Parse JSON body
  const body = await req.json()

  if(!body.restaurantId || !body.userId || body.rating == null){
    return NextResponse.json({ error: "Fields 'restaurantId', 'userId', and 'rating' are required for POST" }, { status: 400 })
  }

  // Ensure valid userIds
  const{ data: user, error: userError } = await supabase
    .from('User')
    .select('id')
    .eq('id', body.userId)
    .single();
  
  if(userError || !user) {
    return NextResponse.json(
      { error: 'Invalid userId' },
      { status: 400}
    );
  }

  // Ensure valid restaurantIds
  const{ data: restaurant, error: restaurantError } = await supabase
    .from('Restaurant')
    .select('id')
    .eq('id', body.restaurantId)
    .single();
  
  if(restaurantError || !restaurant) {
    return NextResponse.json(
      { error: 'Invalid restaurantId' },
      { status: 400}
    );
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('Review')
    .insert([
      { 
        restaurantId: body.restaurantId,
        userId: body.userId,
        rating: body.rating,
        comment: body.comment,   // nullable
      },
    ])
    .select()   // Return inserted row(s)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function PUT(req: Request) {
  const body = await req.json()

  if(!body.id){
    return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })
  }

  const updateData: any = {}
  if (body.rating != null) updateData.rating = body.rating
  if (body.comment != null) updateData.comment = body.comment

  const { data, error } = await supabase
    .from('Review')
    .update(updateData)
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
    .from('Review')
    .delete()
    .eq('id', body.id)
    .select()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}