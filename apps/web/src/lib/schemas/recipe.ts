import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "とくせんリンゴジュース"
  type: z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']),
  power: z.number().positive(), // 料理パワー
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
  })),
  effect: z.string(), // 効果説明
  imageUrl: z.string().url().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
