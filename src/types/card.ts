export type Card = {
    id: string;
    name: string;
    frontImage: string;
    backImage: string;
    description: string;
    date: string;
}

const example: Card = {
  id: "ex-001",
  name: "Example",
  frontImage: "/cards/example_front.webp",
  backImage: "/cards/example_back.webp",
  description: "Example descriptiojn.",
  date: "2026-09-10",
};