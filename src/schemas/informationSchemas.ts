import { z } from "zod";

export const informationSchema = z.object({
  likes: z.number().min(0, "Les likes doivent être positifs."),
  comments: z.array(
    z.object({
      text: z.string(),
      timestamp: z.string(),
      responses: z.array(z.string()), // Ajout du champ responses
    })
  ),
  views: z.number().min(0, "Les vues doivent être positives."),
  isLiked:z.boolean()
});

export type InformationState = z.infer<typeof informationSchema>;
