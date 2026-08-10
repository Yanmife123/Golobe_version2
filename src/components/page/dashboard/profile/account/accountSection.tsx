"use client";
import { useState } from "react";
import { Card } from "@/components/shadcn-ul/card";
import { Button } from "@/components/shadcn-ul/button";
import { X } from "lucide-react";
import { EditableField } from "./editableField";
import { AddEmailDialog } from "./addEmailDialog";

interface AccountData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob: string;
  secondaryEmails: string[];
}

const initialAccount: AccountData = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "changeme123",
  phone: "+1 000-000-0000",
  address: "St 32 main downtown, Los Angeles, California, USA",
  dob: "01-01-1992",
  secondaryEmails: [],
};

export function AccountSection() {
  const [account, setAccount] = useState<AccountData>(initialAccount);

  function update<K extends keyof AccountData>(key: K, value: AccountData[K]) {
    setAccount((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Account</h1>
      <Card className="p-6 gap-0 divide-y divide-gray-100">
        <EditableField
          label="Name"
          value={account.name}
          onSave={(v) => update("name", v)}
        />
        {/*<div className="divide-y divide-gray-100">
          <EditableField
            label="Email"
            value={account.email}
            type="email"
            onSave={(v) => update("email", v)}
            extraAction={
              <AddEmailDialog
                onAdd={(email) =>
                  update("secondaryEmails", [...account.secondaryEmails, email])
                }
              />
            }
          />
          {account.secondaryEmails.map((email) => (
            <div
              key={email}
              className="flex items-center justify-between gap-4 py-5 flex-wrap"
            >
              <div>
                <p className="text-sm text-grey">Additional email</p>
                <p className="font-semibold mt-0.5">{email}</p>
              </div>
              <Button
                variant="outline"
                className="border-destructive text-destructive gap-1.5"
                onClick={() =>
                  update(
                    "secondaryEmails",
                    account.secondaryEmails.filter((e) => e !== email)
                  )
                }
              >
                <X className="w-3.5 h-3.5" /> Remove
              </Button>
            </div>
          ))}
        </div>*/}
        <EditableField
          label="Password"
          value={account.password}
          displayValue={"•".repeat(12)}
          type="password"
          onSave={(v) => update("password", v)}
        />
        <EditableField
          label="Phone number"
          value={account.phone}
          type="tel"
          onSave={(v) => update("phone", v)}
        />
        <EditableField
          label="Address"
          value={account.address}
          onSave={(v) => update("address", v)}
        />
        <EditableField
          label="Date of birth"
          value={account.dob}
          onSave={(v) => update("dob", v)}
        />
      </Card>
    </div>
  );
}
