import { z } from "zod";

export const userSchema = z.object({
  nomUtilisateur: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  prenomUtilisateur: z.string().min(2, "Les prénoms doivent comporter au moins 2 caractères."),
  telephoneUtilisateur: z
    .string().min(9,"Numéro de téléphone invalide."),
    // .regex(/^((07|05|01|57)[0-9]{7})$/, "Numéro de téléphone invalide."),
  eglise: z.string().min(3, "Le nom de l'église est requis."),
  statut: z.enum(["Pasteur Principal", "Pasteur Membre", "Membre ordinaire"]),
});

export type UserState = z.infer<typeof userSchema>;
