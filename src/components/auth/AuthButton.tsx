"use client";
import { useAccount, useModal } from "@particle-network/connectkit";
import React from "react";
import { Button } from "../ui/button";
import { UserCircle, Wallet } from "lucide-react";

const AuthButton = () => {
  const { isConnected, address, isConnecting } = useAccount();
  const { setOpen } = useModal();

  if (isConnected) {
    return (
      <Button onClick={() => setOpen(true)} disabled={isConnecting}>
        <UserCircle className="mr-2 size-4" />
        {address?.slice(0, 6)} ...
      </Button>
    );
  }
  return (
    <Button onClick={() => setOpen(true)} disabled={isConnecting}>
      <Wallet className="mr-2 size-4" />
      Connect wallet
    </Button>
  );
};

export default AuthButton;
