import { z } from "zod";

const formSchema = z.object({
  nume: z
    .string()
    .trim()
    .min(3, "Numele trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele nu poate depăși 50 de caractere")
    .regex(
      /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/,
      "Numele poate conține doar litere, spații și cratimă"
    ),

  adresa: z
    .string()
    .trim()
    .min(5, "Adresa trebuie să conțină cel puțin 5 caractere")
    .max(100, "Adresa nu poate depăși 100 de caractere"),

  oras: z
    .string()
    .trim()
    .min(3, "Orașul trebuie să conțină cel puțin 3 caractere")
    .max(50, "Orașul nu poate depăși 50 de caractere")
    .regex(
      /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/,
      "Orașul poate conține doar litere, spații și cratimă"
    ),

  codPostal: z
    .string()
    .trim()
    .regex(/^\d{4,10}$/, "Codul poștal trebuie să conțină între 4 și 10 cifre"),

  telefon: z
    .string()
    .trim()
    .regex(
      /^(\+\d{1,4})?[\s.-]?(\d{1,4}[\s.-]?)?\d{6,14}$/,
      "Introduceți un număr de telefon valid (format național sau internațional)"
    ),

  email: z.string().trim().email("Introduceți o adresă de email validă"),

  judet: z
    .string()
    .trim()
    .min(2, "Județul trebuie să conțină cel puțin 2 caractere")
    .max(50, "Județul nu poate depăși 50 de caractere")
    .regex(
      /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/,
      "Județul poate conține doar litere, spații și cratimă"
    ),
});

export default formSchema;
export const defaultValues = {
  nume: "",
  adresa: "",
  oras: "",
  codPostal: "",
  telefon: "",
  email: "",
  judet: "",
};
