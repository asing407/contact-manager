
export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}
