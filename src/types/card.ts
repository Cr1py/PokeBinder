export type Card = {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  description: string;
  date: string;
};

export type BinderSlot = {
  position: number;
  cardId: string | null;
};

export type BinderPageData = {
  pageNumber: number;
  slots: BinderSlot[];
};

export type CardRow = {
  id: string;
  name: string;
  front_image: string;
  back_image: string;
  description: string | null;
  date: string | null;
};

export function cardFromRow(row: CardRow): Card {
  return {
    id: row.id,
    name: row.name,
    frontImage: row.front_image,
    backImage: row.back_image,
    description: row.description ?? "",
    date: row.date ?? "",
  };
}