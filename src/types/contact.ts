
export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  birthday?: string;
  socialMedia?: SocialMedia;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  birthday?: string;
  socialMedia?: SocialMedia;
}
