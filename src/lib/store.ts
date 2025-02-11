
import { Contact } from "@/types/contact";
import { supabase } from "./supabase";

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Contact[];
};

export const getContact = async (id: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Contact;
};

export const addContact = async (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      ...contact,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
};

export const updateContact = async (id: string, contact: Partial<Contact>) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({
      ...contact,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
};

export const deleteContact = async (id: string) => {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const searchContacts = async (query: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .or(`
      full_name.ilike.%${query}%,
      email.ilike.%${query}%,
      phone.ilike.%${query}%,
      address.ilike.%${query}%,
      notes.ilike.%${query}%
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Contact[];
};
