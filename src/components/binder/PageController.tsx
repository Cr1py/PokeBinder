type PageControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function getLeftPageNum(spread: number, totalSpreads: number): number | null {
  if (spread === 1) return null; // inside front cover: blank
  return 2 * (spread - 1);
}

export function getRightPageNum(spread: number, totalSpreads: number): number | null {
  if (spread === 1) return 1;
  if (spread === totalSpreads) return null; // inside back cover: blank
  return 2 * (spread - 1) + 1;
}

export default function PageController({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PageControlsProps) {
  return (
    <div className="flex items-center gap-6">
      {/* buttons are temp until I can figure out how to make the corners turn */}
      {/* <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-lg bg-grey-darker px-5 py-2 text-white transition hover:bg-grey-darker-700 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Previous
      </button>*/}

      <span className="text-black">
        {currentPage} / {totalPages}
      </span>

      {/* <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-grey-darker px-5 py-2 text-white transition hover:bg-grey-darker-700 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next
      </button>*/}
    </div>
  );
}