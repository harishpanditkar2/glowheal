// Service type from services.json
export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  backgroundImage: string;
  priceRange: string;
  consultationFee: number;
  conditions: string[];
  metaTitle: string;
  metaDescription: string;
}

// Doctor type from doctors.sample.json
export interface Doctor {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  subSpecialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  languages: string[];
  city: string;
  gender: string;
  availability: string;
  image: string;
  bio: string;
  education: string[];
  registrationNumber: string;
  conditions: string[];
  awards: string[];
  nextAvailable: string;
}

// City type from cities.json
export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  stats: {
    doctors: number;
    patientsServed: number;
    specialties: number;
    clinics: number;
  };
  description: string;
  metaTitle: string;
  metaDescription: string;
  localKeywords: string[];
}
