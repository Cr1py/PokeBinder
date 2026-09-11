"use client";
import CardSleeve from "@/components/sleeve/CardSleeve";
import { cards, binderPages } from "@/data/cards";
import { Card } from "@/types/card";

type PageContentProps = {
  pageNum: number | null;
  onCardClick?: (card: Card) => void;
};

export default function PageContent({ pageNum, onCardClick }: PageContentProps) {
  if (pageNum === null) {
    return <div className="h-full w-full rounded-xl bg-white/5" />;
  }

  const pageData = binderPages.find((page) => page.pageNumber === pageNum);
  const slots = pageData?.slots ?? Array.from({ length: 9 }, (_, i) => ({
    position: i + 1,
    cardId: null,
  }));

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-4">
        {slots.map((slot) => {
          const card = slot.cardId
            ? cards.find((c) => c.id === slot.cardId)
            : undefined;

          return (
            <CardSleeve
              key={slot.position}
              card={card}
              onCardClick={onCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}