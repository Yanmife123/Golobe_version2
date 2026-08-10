"use client";
import { useState } from "react";
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
import { Plus } from "lucide-react";

export function AddEmailDialog({ onAdd }: { onAdd: (email: string) => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    onAdd(email.trim());
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setEmail("");
          setError("");
        }
      }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="border-secondaryT gap-1.5"
      >
        <Plus className="w-3.5 h-3.5" /> Add another email
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add another email</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="new-email">Email address</Label>
          <Input
            id="new-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="you@example.com"
            className="border-[#79747E] rounded-sm"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
        <FormBtn onClick={handleSave}>Add email</FormBtn>
      </DialogContent>
    </Dialog>
  );
}
