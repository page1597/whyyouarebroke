// const MAX_FILE_SIZE = 5000000;

import { z } from "zod";

// const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const addProductFormSchema = z.object({
  id: z.string(),
  category: z.string(),
  // .min(2, {
  //   message: "이름을 입력해주세요.",
  // })
  name: z.string().min(1),
  price: z.preprocess(Number, z.number()),
  image: z.any(), // 이미지 스키마 설정하기
  stock: z.preprocess(Number, z.number()),
  description: z.string().min(1),
  artist: z.string(),
  label: z.string().optional(),
  released: z.string().optional(),
  format: z.string().optional(),
  createdAt: z.number(),
});
