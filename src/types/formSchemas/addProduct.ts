// const MAX_FILE_SIZE = 5000000;

import { z } from "zod";

// const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const addProductFormSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  price: z.preprocess(Number, z.number()),
  image: z.any(), // 이미지 스키마 설정하기
  stock: z.preprocess(Number, z.number()),
  description: z.string(),
  artist: z.string().optional(),
  label: z.string().optional(),
  released: z.string().optional(),
  format: z.string().optional(),
  createdAt: z.number(),
});
