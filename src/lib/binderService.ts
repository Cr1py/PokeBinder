import { supabase } from "./supabase";
import { BinderPageData, BinderSlot } from "@/types/card";

type BinderSlotRow = {
  page_number: number;
  position: number;
  card_id: string | null;
};

export async function fetchBinderPages(): Promise<BinderPageData[]> {
  const { data, error } = await supabase
    .from("binder_slots")
    .select("page_number, position, card_id")
    .order("page_number", { ascending: true })
    .order("position", { ascending: true });

  if (error) throw error;

  const rows = data as BinderSlotRow[];

  // group flat rows into { pageNumber, slots[] } shape
  const pageMap = new Map<number, BinderSlot[]>();

  for (const row of rows) {
    const slots = pageMap.get(row.page_number) ?? [];
    slots.push({ position: row.position, cardId: row.card_id });
    pageMap.set(row.page_number, slots);
  }

  return Array.from(pageMap.entries())
    .map(([pageNumber, slots]) => ({ pageNumber, slots }))
    .sort((a, b) => a.pageNumber - b.pageNumber);
}

const SLOTS_PER_PAGE = 9;

/* finds the next empty slot across all pages, creating a new page's worth
  of empty slots if every existing page is full.
*/
export async function assignCardToNextSlot(cardId: string): Promise<void> {
  const { data, error } = await supabase
    .from("binder_slots")
    .select("page_number, position, card_id")
    .order("page_number", { ascending: true })
    .order("position", { ascending: true });

  if (error) throw error;

  const rows = data as BinderSlotRow[];

  // look for any existing row with no card assigned
  const emptySlot = rows.find((row) => row.card_id === null);

  if (emptySlot) {
    const { error: updateError } = await supabase
      .from("binder_slots")
      .update({ card_id: cardId })
      .eq("page_number", emptySlot.page_number)
      .eq("position", emptySlot.position);

    if (updateError) throw updateError;
    return;
  }

  const highestPage = rows.reduce((max, row) => Math.max(max, row.page_number), 0);
  const nextPage = highestPage + 1;

  const newSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => ({
    page_number: nextPage,
    position: i + 1,
    card_id: i === 0 ? cardId : null,
  }));

  const { error: insertError } = await supabase.from("binder_slots").insert(newSlots);
  if (insertError) throw insertError;
}