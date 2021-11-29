import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffnzqbecxzgntwmclwzz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODE3NDk2NiwiZXhwIjoxOTUzNzUwOTY2fQ.qiPrh_RftC9DtaeuLiUQg-JeyLE_o2JnPCiiLZE4XK4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)