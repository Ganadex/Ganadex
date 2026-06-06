export type Category = "leche" | "carne" | "doble_proposito" | "criolla";
export type Sex = "macho" | "hembra";
export type AnimalStatus = "disponible" | "vendido" | "reservado";

export interface Breed {
  id: string;
  nombre: string;
  categoria: Category;
  origen: string;
  created_at: string;
}

export interface Seller {
  id: string;
  user_id: string;
  name: string;
  company_name?: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  state: string;
  country: string;
  bio?: string;
  avatar_url?: string;
  verified: boolean;
  rating: number;
  total_sales: number;
  created_at: string;
}

export interface AnimalImage {
  id?: string;
  animal_id?: string;
  url: string;
  es_portada: boolean;
  orden?: number;
  created_at?: string;
}

export interface AnimalVideo {
  id: string;
  animal_id: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  created_at: string;
}

export interface Animal {
  id: string;
  vendedor_id?: string;
  raza_id?: string;
  nombre: string;
  numero_registro?: string;
  categoria: Category;
  sexo: Sex;
  edad_meses: number;
  peso_kg: number;
  precio: number;
  moneda: string;
  ubicacion: string;
  estado: string;
  pais?: string;
  descripcion?: string;
  informacion_genetica?: string;
  status: AnimalStatus;
  vistas?: number;
  destacado: boolean;
  created_at: string;
  updated_at?: string;
  breed?: Breed;
  seller?: {
    id: string;
    nombre_completo: string;
    ubicacion?: string;
    estado?: string;
    verificado?: boolean;
  };
  images?: AnimalImage[];
  videos?: AnimalVideo[];
}

export interface FilterState {
  category?: Category;
  breed_id?: string;
  sex?: Sex;
  min_age?: number;
  max_age?: number;
  min_price?: number;
  max_price?: number;
  state?: string;
  country?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  animal_id?: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "seller" | "admin";
  created_at: string;
}
