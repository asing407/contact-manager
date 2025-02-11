
import { Contact } from "@/types/contact";
import { supabase } from "@/integrations/supabase/client";

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(formatContact);
};

export const getContact = async (id: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return formatContact(data);
};

export const addContact = async (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      full_name: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes
    }])
    .select()
    .single();

  if (error) throw error;
  return formatContact(data);
};

export const updateContact = async (id: string, contact: Partial<Contact>) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({
      full_name: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return formatContact(data);
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
    .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,address.ilike.%${query}%,notes.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(formatContact);
};

// Helper function to format contact data from Supabase
function formatContact(data: any): Contact {
  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
