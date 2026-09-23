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

export async function updateCard(card: Card): Promise<void> {
  const { error } = await supabase
    .from("cards")
    .update({
      name: card.name,
      front_image: card.frontImage,
      back_image: card.backImage,
      description: card.description,
      date: card.date,
    })
    .eq("id", card.id);

  if (error) throw error;
}

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/card-images/";
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return publicUrl.slice(index + marker.length);
}

export async function deleteCardImages(card: Card): Promise<void> {
  const paths = [card.frontImage, card.backImage]
    .map(extractStoragePath)
    .filter((path): path is string => path !== null);

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from("card-images").remove(paths);
  if (error) throw error;
}

export async function deleteCard(card: Card): Promise<void> {
  await deleteCardImages(card);

  const { error } = await supabase.from("cards").delete().eq("id", card.id);
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