"use client";
import PageContent from "./PageContent";
import FlippingLeaf from "./FlippingLeaf";
import PageCorner from "./PageCorner";
import { getLeftPageNum, getRightPageNum } from "./PageController";
import { Card, BinderPageData } from "@/types/card";

type BinderPageProps = {
  spread: number;
  totalSpreads: number;
  flipDirection: 1 | -1 | null;
  onFlipComplete: () => void;
  onRequestNext: () => void;
  onRequestPrev: () => void;
  selectedCardId: string | null;
  onSelectCard: (card: Card) => void;
  onDeselectCard: () => void;
  onInspectCard: (card: Card) => void;
  cards: Card[];
  binderPages: BinderPageData[];
};

export default function BinderPage({
  spread,
  totalSpreads,
  flipDirection,
  onFlipComplete,
  onRequestNext,
  onRequestPrev,
  selectedCardId,
  onSelectCard,
  onDeselectCard,
  onInspectCard,
  cards,
  binderPages,
}: BinderPageProps) {
  const leftPageNum = getLeftPageNum(spread, totalSpreads);
  const rightPageNum = getRightPageNum(spread, totalSpreads);
  const nextLeftPageNum = getLeftPageNum(spread + 1, totalSpreads);
  const nextRightPageNum = getRightPageNum(spread + 1, totalSpreads);
  const prevLeftPageNum = getLeftPageNum(spread - 1, totalSpreads);
  const prevRightPageNum = getRightPageNum(spread - 1, totalSpreads);

  const staticLeftPageNum = flipDirection === -1 ? prevLeftPageNum : leftPageNum;
  const staticRightPageNum = flipDirection === 1 ? nextRightPageNum : rightPageNum;

  const canGoNext = spread < totalSpreads && flipDirection === null;
  const canGoPrev = spread > 1 && flipDirection === null;

  return (
    <div
      className="relative h-full w-full rounded-2xl bg-grey-darker p-8 shadow-2xl"
      style={{ perspective: 2400 }}
    >
      <div className="absolute left-0 top-0 h-full w-1/2 py-8 pl-8 pr-4">
        <PageContent
          pageNum={staticLeftPageNum}
          cards={cards}
          binderPages={binderPages}
          selectedCardId={selectedCardId}
          onSelectCard={onSelectCard}
          onDeselectCard={onDeselectCard}
          onInspectCard={onInspectCard}
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-1/2 py-8 pl-4 pr-8">
        <PageContent
          pageNum={staticRightPageNum}
          cards={cards}
          binderPages={binderPages}
          selectedCardId={selectedCardId}
          onSelectCard={onSelectCard}
          onDeselectCard={onDeselectCard}
          onInspectCard={onInspectCard}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/40" />

      {/* <PageCorner position="top-left" onClick={onRequestPrev} disabled={!canGoPrev} /> */}
      <PageCorner position="bottom-left" onClick={onRequestPrev} disabled={!canGoPrev} />
      {/* <PageCorner position="top-right" onClick={onRequestNext} disabled={!canGoNext} />  */}
      <PageCorner position="bottom-right" onClick={onRequestNext} disabled={!canGoNext} />

      {flipDirection !== null && (
        <FlippingLeaf
          key={`${spread}-${flipDirection}`}
          direction={flipDirection}
          frontPageNum={flipDirection === 1 ? rightPageNum : leftPageNum}
          backPageNum={flipDirection === 1 ? nextLeftPageNum : prevRightPageNum}
          onComplete={onFlipComplete}
          cards={cards}
          binderPages={binderPages}
          selectedCardId={selectedCardId}
          onSelectCard={onSelectCard}
          onDeselectCard={onDeselectCard}
          onInspectCard={onInspectCard}
        />
      )}
    </div>
  );
}