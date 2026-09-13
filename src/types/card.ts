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