"use client";
import { useAccount, useModal } from "@particle-network/connectkit";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, UserCircle, Wallet } from "lucide-react";
import { useAuthProvider } from "../providers/AuthProvider";

type Props = {
  label?: string;
};
const AuthButton: React.FC<Props> = ({ label }) => {
  const { isConnected, address, isConnecting } = useAccount();
  const { setOpen } = useModal({
    onDisconnect() {
      console.log("Disconnected");
    },
    onConnect({ address, connectorId }) {
      console.log("Connected", address, connectorId);
    },
  });
  const { loading, session } = useAuthProvider();

  if (isConnected && session) {
    return (
      <Button onClick={() => setOpen(true)} disabled={isConnecting}>
        <UserCircle className="mr-2 size-4" />
        {address?.slice(0, 6)} ...
      </Button>
    );
  }
  return (
    <Button onClick={() => setOpen(true)} disabled={isConnecting || loading}>
      {isConnecting || loading ? (
        <Loader2 className="size-5 mr-2 animate-spin" />
      ) : (
        <Wallet className="mr-2 size-4" />
      )}
      {label ?? "Connect wallet"}
    </Button>
  );
};

export default AuthButton;
