import { supabase } from '../lib/supabaseClient'

export const getAll = async () => {
  let { data } = await supabase
    .from('tasks')
    .select('*')

  return data;
}

export const getOne = async (id) => {
  let { data } = await supabase
    .from('tasks')
    .select('*')
    .eq("id", id);

  return data;
}
