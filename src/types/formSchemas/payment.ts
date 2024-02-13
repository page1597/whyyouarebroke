import { z } from "zod";

export const paymentFormSchema = z.object({
  buyer_name: z.string(),
  buyer_addr: z.string(),
  buyer_tel: z.string(),
  buyer_email: z.string(),
  buyer_postcode: z.string(),
});
