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
import { Pencil } from "lucide-react";

interface EditableFieldProps {
  label: string;
  value: string;
  displayValue?: string;
  type?: "text" | "email" | "tel" | "date" | "password";
  onSave: (value: string) => void;
  extraAction?: React.ReactNode;
}

export function EditableField({
  label,
  value,
  displayValue,
  type = "text",
  onSave,
  extraAction,
}: EditableFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 py-5 sm:flex-row flex-col">
      <div className="flex flex-col sm:items-start items-center">
        <p className="text-sm text-grey">{label}</p>
        <p className="font-semibold mt-0.5">{displayValue ?? value}</p>
      </div>
      <div className="flex items-center gap-3 max-sm:w-full">
        {extraAction}
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="border-secondaryT gap-1.5 max-sm:w-full"
        >
          <Pencil className="w-3.5 h-3.5" /> Change
        </Button>
      </div>

      {type === "password" ? (
        <PasswordDialog open={open} onOpenChange={setOpen} onSave={onSave} />
      ) : (
        <SimpleFieldDialog
          open={open}
          onOpenChange={setOpen}
          label={label}
          type={type}
          initialValue={value}
          onSave={onSave}
        />
      )}
    </div>
  );
}

function SimpleFieldDialog({
  open,
  onOpenChange,
  label,
  type,
  initialValue,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  type: "text" | "email" | "tel" | "date";
  initialValue: string;
  onSave: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  function handleSave() {
    if (!value.trim()) {
      setError(true);
      return;
    }
    onSave(value.trim());
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) {
          setValue(initialValue);
          setError(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change {label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="field-value">{label}</Label>
          <Input
            id="field-value"
            type={type}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            className="border-[#79747E] rounded-sm"
          />
          {error && (
            <p className="text-destructive text-sm">{label} cannot be empty</p>
          )}
        </div>
        <FormBtn onClick={handleSave}>Save</FormBtn>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string) => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    if (!current || !next || !confirm) {
      setError("Please fill in every field.");
      return;
    }
    if (next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New password and confirmation don't match.");
      return;
    }
    onSave(next);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) {
          setCurrent("");
          setNext("");
          setConfirm("");
          setError("");
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              id="current-password"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="border-[#79747E] rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="border-[#79747E] rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border-[#79747E] rounded-sm"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
        <FormBtn onClick={handleSave}>Save</FormBtn>
      </DialogContent>
    </Dialog>
  );
}
