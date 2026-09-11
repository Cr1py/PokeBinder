"use client";
import { useState } from "react";
import BinderCover from "./BinderCover";
import BinderPage from "./BinderPage";
// import PageController from "./PageController";

const TOTAL_PAGES = 4;

export default function Binder() {
  const [isOpen, setIsOpen] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const nextPage = () => {
    if (currPage < TOTAL_PAGES) {
      setCurrPage(page => page+1);
    }
  }

  const prevPage = () => {
    if (currPage > 1) {
      setCurrPage(page => page-1);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="relative w-[min(983px,90vw,calc(85vh*(260/350)))] h-[min(1323px,85vh,calc(90vw*(350/260)))]">
        {!isOpen ? (
          <BinderCover onOpen={() => setIsOpen(true)} />
        ) : (
          <BinderPage pageNum={currPage} />
        )}
      </div>

    </div>
  );
}