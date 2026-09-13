import { supabase } from "./supabase";
import { Card, CardRow, cardFromRow } from "@/types/card";

export async function fetchCards(): Promise<Card[]> {
  const { data, error } = await supabase.from("cards").select("*");
  if (error) throw error;
  return (data as CardRow[]).map(cardFromRow);
}

export async function addCard(card: Card): Promise<void> {
  const { error } = await supabase.from("cards").insert({
    id: card.id,
    name: card.name,
    front_image: card.frontImage,
    back_image: card.backImage,
    description: card.description,
    date: card.date,
  });
  if (error) throw error;
}

export async function deleteCard(cardId: string): Promise<void> {
  const { error } = await supabase.from("cards").delete().eq("id", cardId);
  if (error) throw error;
}

export async function uploadCardImage(file: File, cardId: string, side: "front" | "back"): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const filePath = `${cardId}-${side}.${fileExt}`;

  const { error } = await supabase.storage
    .from("card-images")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("card-images").getPublicUrl(filePath);
  return data.publicUrl;
}