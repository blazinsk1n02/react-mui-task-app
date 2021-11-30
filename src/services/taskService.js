import { supabase } from '../lib/supabaseClient'

export const getAll = async () => {
  let { data } = await supabase
    .from('tasks')
    .select('*')

  return Object.values(data);
}

export const getOne = async (id) => {
  let { data } = await supabase
    .from('tasks')
    .select('*')
    .order("id", { ascending: false });

  return Object.values(data);
}
