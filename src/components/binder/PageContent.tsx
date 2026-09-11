type PageContentProps = {
  pageNum: number | null;
};

const slots = Array.from({ length: 9 });

export default function PageContent({ pageNum }: PageContentProps) {
  if (pageNum === null) {
    return <div className="h-full w-full rounded-xl bg-white/5" />;
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-4">
        {slots.map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg border border-white/20 bg-white/5 p-3"
          >
            <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-white/20 text-sm text-white/40">
              Card {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}