import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('data_sensor')
    .select('timestamp, nilai')
    .eq('id_sensor', 1) // 1 = sensor ketinggian air
    .order('timestamp', { ascending: false })
    .limit(30) // ambil 30 data terakhir

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(data), { status: 200 })
}
