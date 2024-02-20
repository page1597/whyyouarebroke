import { z } from "zod";

export const paymentFormSchema = z.object({
  buyer_name: z.string().min(1),
  buyer_addr: z.string().min(1),
  buyer_tel: z.string().min(1),
  buyer_email: z.string().min(1),
  buyer_postcode: z.string().min(1),
});
