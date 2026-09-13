import { Card, BinderPageData } from "@/types/card";

export const cards: Card[] = [
  {
    id: "ex-001",
    name: "Example 2",
    frontImage: "/examples/pikachu-and-zekrom-g-x-tag-team-pokemon-card.png",
    backImage: "/examples/pkmn-back.png",
    description: "Example description.",
    date: "2026-09-10",
  },
  {
    id: "ex-002",
    name: "Example 2",
    frontImage: "/examples/pkmn-back.png",
    backImage: "/examples/pkmn-back.png",
    description: "Example description 2.",
    date: "2026-09-10",
  },
];

export const binderPages: BinderPageData[] = [
  {
    pageNumber: 1,
    slots: [
      { position: 1, cardId: null },
      { position: 2, cardId: null },
      { position: 3, cardId: null },
      { position: 4, cardId: null },
      { position: 5, cardId: null },
      { position: 6, cardId: null },
      { position: 7, cardId: null },
      { position: 8, cardId: null  },
      { position: 9, cardId: null },
    ],
  },
];