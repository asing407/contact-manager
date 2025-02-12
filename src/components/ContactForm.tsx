
import { useState } from "react";
import { ContactFormData, SocialMedia } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  initialData?: ContactFormData;
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

export function ContactForm({ initialData, onSubmit, className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(
    initialData || {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      birthday: "",
      socialMedia: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      }
    }
  );

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleSocialMediaChange = (platform: keyof SocialMedia, value: string) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          id="birthday"
          type="date"
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address (Optional)</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <Label>Social Media (Optional)</Label>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={formData.socialMedia?.linkedin || ""}
              onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              type="url"
              placeholder="https://twitter.com/username"
              value={formData.socialMedia?.twitter || ""}
              onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/username"
              value={formData.socialMedia?.facebook || ""}
              onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              type="url"
              placeholder="https://instagram.com/username"
              value={formData.socialMedia?.instagram || ""}
              onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Contact
      </Button>
    </form>
  );
}
