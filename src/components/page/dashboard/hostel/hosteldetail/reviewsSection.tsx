"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/shadcn-ul/button";
import { Input } from "@/components/shadcn-ul/input";
import { Label } from "@/components/shadcn-ul/label";
import { FormBtn } from "@/components/utility/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ul/dialog";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { HotelReview } from "@/static-data/hotelData";

const PAGE_SIZE = 5;

export function ReviewsSection({
  rating,
  ratingLabel,
  initialReviews,
}: {
  rating: number;
  ratingLabel: string;
  initialReviews: HotelReview[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pageCount = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const visible = reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function addReview(text: string) {
    setReviews((prev) => [
      {
        id: `new-${Date.now()}`,
        name: "John Doe",
        avatar: "/default-pic.jpg",
        score: 5.0,
        scoreLabel: "Amazing",
        text,
      },
      ...prev,
    ]);
    setPage(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-semibold text-lg">Reviews</h2>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-secondaryT text-primaryT font-semibold hover:bg-mintygreen"
        >
          Give your review
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-4xl font-bold">{rating}</p>
        <div>
          <p className="font-semibold">{ratingLabel}</p>
          <p className="text-sm text-grey">{reviews.length} verified reviews</p>
        </div>
      </div>

      <div className="divide-y">
        {visible.map((review) => (
          <div key={review.id} className="py-4 flex gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={review.avatar}
                alt={review.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">
                  {review.score.toFixed(1)} {review.scoreLabel}
                </span>{" "}
                <span className="text-grey">| {review.name}</span>
              </p>
              <p className="text-sm text-grey mt-1">{review.text}</p>
            </div>
            <Flag className="w-4 h-4 text-grey flex-shrink-0" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-grey">
          {page + 1} of {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount - 1}
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          className="disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <ReviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={addReview}
      />
    </div>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) {
          setText("");
          setError(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give your review</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="review-text">Your review</Label>
          <Input
            id="review-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(false);
            }}
            placeholder="Share your experience..."
            className="border-[#79747E] rounded-sm"
          />
          {error && (
            <p className="text-destructive text-sm">
              Please write something first.
            </p>
          )}
        </div>
        <FormBtn
          onClick={() => {
            if (!text.trim()) {
              setError(true);
              return;
            }
            onSubmit(text.trim());
            onOpenChange(false);
          }}
        >
          Submit review
        </FormBtn>
      </DialogContent>
    </Dialog>
  );
}
