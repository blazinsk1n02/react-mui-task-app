import { supabase } from '../lib/supabaseClient'

export const getAll = async () => {
  let { data } = await supabase
    .from('tasks')
    .select('*')

  return Object.values(data);
}