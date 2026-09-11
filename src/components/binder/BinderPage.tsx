type BinderPageProps = {
  pageNum: number;
};

const slots = Array.from({ length: 9 });

export default function BinderPage({ pageNum }: BinderPageProps) {
  return (
    <div className="h-full w-full rounded-2xl bg-grey-darker p-8 shadow-2xl">
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-6">
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

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
        Page {pageNum}
      </p>
    </div>
  );
}