"use client";
import { useState } from "react";
import { Card } from "@/components/shadcn-ul/card";
import { EditableField } from "./editableField";
import { updatePasswordAction } from "@/lib/supabase/auth-actions";

interface AccountData {
  name: string;
  phone: string;
  address: string;
  dob: string;
}

export function AccountSection({
  initialName,
  email,
  initialPhone,
  initialAddress,
  initialDob,
}: {
  initialName: string;
  email: string;
  initialPhone: string;
  initialAddress: string;
  initialDob: string;
}) {
  const [account, setAccount] = useState<AccountData>({
    name: initialName,
    phone: initialPhone,
    address: initialAddress,
    dob: initialDob,
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);

  function update<K extends keyof AccountData>(key: K, value: AccountData[K]) {
    setAccount((prev) => ({ ...prev, [key]: value }));
  }

  async function handlePasswordSave(newPassword: string) {
    setPasswordSaved(false);
    const result = await updatePasswordAction(newPassword);
    if ("error" in result) {
      setPasswordError(result.error);
      return;
    }
    setPasswordError(null);
    setPasswordSaved(true);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Account</h1>
      <Card className="p-6 gap-0 divide-y divide-gray-100">
        <EditableField
          label="Name"
          value={account.name || "Add your name"}
          onSave={(v) => update("name", v)}
        />
        <div className="flex items-center justify-between gap-4 py-5 sm:flex-row flex-col">
          <div className="flex flex-col sm:items-start items-center">
            <p className="text-sm text-grey">Email</p>
            <p className="font-semibold mt-0.5">{email}</p>
          </div>
        </div>
        <div>
          <EditableField
            label="Password"
            value=""
            displayValue={"•".repeat(12)}
            type="password"
            onSave={handlePasswordSave}
          />
          {passwordError && (
            <p className="text-destructive text-xs -mt-3 pb-3">
              {passwordError}
            </p>
          )}
          {passwordSaved && (
            <p className="text-secondaryT text-xs -mt-3 pb-3">
              Password updated.
            </p>
          )}
        </div>
        <EditableField
          label="Phone number"
          value={account.phone || "Add a phone number"}
          type="tel"
          onSave={(v) => update("phone", v)}
        />
        <EditableField
          label="Address"
          value={account.address || "Add an address"}
          onSave={(v) => update("address", v)}
        />
        <EditableField
          label="Date of birth"
          value={account.dob || "Add your date of birth"}
          onSave={(v) => update("dob", v)}
        />
      </Card>
    </div>
  );
}
