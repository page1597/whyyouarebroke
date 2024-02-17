import { z } from "zod";
// const strongPasswordRegex = new RegExp(`${easyStringRegex.source}${passwordRegx.source}`);

const passwordRegx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?()_+~-]).{8,15}$/;
const easyStringRegex =
  /^(?!.*(123|abc|admin|password|qwerty|letmein|welcome|monkey|12345|123456|654321|11111|123123|admin123|password123|test|pass|login|letme|welcome1|admin1234|admin@123))/;

export const signUpFormSchema = z
  .object({
    type: z.string(),
    password: z
      .string()
      .regex(passwordRegx, "영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)으로 입력해주세요.")
      .regex(easyStringRegex, "일련번호, 잘 알려진 단어, 키보드 상 나란히 있는 문자를 제외해주세요."),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2, {
        message: "이름을 입력해주세요.",
      })
      .max(16, {
        message: "이름을 16자 이하로 입력해주세요.",
      }),
    email: z.string().email({
      message: "올바른 이메일 형식이 아닙니다.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 다릅니다.",
        path: ["confirmPassword"],
      });
    }
  });
