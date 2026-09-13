"use client";
import CardSleeve from "@/components/sleeve/CardSleeve";
import { Card, BinderPageData } from "@/types/card";

type PageContentProps = {
  pageNum: number | null;
  cards: Card[];
  binderPages: BinderPageData[];
  selectedCardId: string | null;
  onSelectCard: (card: Card) => void;
  onDeselectCard: () => void;
  onInspectCard: (card: Card) => void;
};

export default function PageContent({
  pageNum,
  cards,
  binderPages,
  selectedCardId,
  onSelectCard,
  onDeselectCard,
  onInspectCard,
}: PageContentProps) {
  if (pageNum === null) {
    return <div className="h-full w-full rounded-xl bg-white/5" />;
  }

  const safeBinderPages = binderPages ?? [];
  const safeCards = cards ?? [];

  const pageData = safeBinderPages.find((page) => page.pageNumber === pageNum);
  const slots =
    pageData?.slots ??
    Array.from({ length: 9 }, (_, i) => ({ position: i + 1, cardId: null }));

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-4">
        {slots.map((slot) => {
          const card = slot.cardId
            ? safeCards.find((c) => c.id === slot.cardId)
            : undefined;

          return (
            <CardSleeve
              key={slot.position}
              card={card}
              isSelected={card ? card.id === selectedCardId : false}
              onSelect={onSelectCard}
              onDeselect={onDeselectCard}
              onInspect={onInspectCard}
            />
          );
        })}
      </div>
    </div>
  );
}