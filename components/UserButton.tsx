"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, signOut } from "@/lib/auth-client";
import { useAuthSession } from "@/components/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Crown, Loader2, LogOut, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserButton() {
  const { session, isPending, hasPremiumAccess } = useAuthSession();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (isPending) {
    return <div className="bg-muted size-8 animate-pulse rounded-full" />;
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const initials = user.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : user.email[0].toUpperCase();

  function handleDeleteDialogChange(open: boolean) {
    if (!open && isDeleting) {
      return;
    }

    setDeleteDialogOpen(open);

    if (!open) {
      setPassword("");
      setDeleteError("");
    }
  }

  async function handleDeleteAccount() {
    setDeleteError("");
    setIsDeleting(true);

    const normalizedPassword = password.trim();
    const { error } = await deleteUser({
      password: normalizedPassword || undefined,
    });

    setIsDeleting(false);

    if (error) {
      if (error.code === "INVALID_PASSWORD") {
        setDeleteError("Incorrect password. Please try again.");
        return;
      }

      if (error.code === "SESSION_EXPIRED") {
        setDeleteError(
          "Your session is no longer fresh. Sign in again, then retry deleting your account.",
        );
        return;
      }

      if (error.code === "CREDENTIAL_ACCOUNT_NOT_FOUND") {
        setDeleteError(
          "This account does not use a password. Leave the field empty and retry after signing in again if needed.",
        );
        return;
      }

      setDeleteError(error.message ?? "Could not delete your account.");
      return;
    }

    setDeleteDialogOpen(false);
    setPassword("");
    router.replace("/");
    router.refresh();
  }

  return (
    <AlertDialog
      open={deleteDialogOpen}
      onOpenChange={handleDeleteDialogChange}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "focus-visible:ring-ring relative inline-flex rounded-full outline-none focus-visible:ring-2",
              hasPremiumAccess &&
                "ring-offset-background ring-2 ring-amber-500/55 ring-offset-2 dark:ring-amber-400/45",
            )}
            aria-label={`Open account menu for ${user.name ?? user.email}${hasPremiumAccess ? ", Premium" : ""}`}
          >
            <span className="relative inline-flex">
              <Avatar>
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              {hasPremiumAccess ? (
                <span
                  className="pointer-events-none absolute -right-0.5 -bottom-0.5 z-10 flex size-[15px] items-center justify-center rounded-full border border-amber-600/25 bg-amber-500 text-amber-950 shadow-sm ring-2 ring-background dark:border-amber-300/30 dark:bg-amber-400 dark:text-amber-950"
                  aria-hidden
                >
                  <Crown className="size-[9px]" strokeWidth={2.5} />
                </span>
              ) : null}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              setDeleteError("");
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="size-4" />
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader className="items-start text-left">
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes your account and active sessions. If you
            use email/password, enter your password below. If you use Google,
            you can leave it blank.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password (optional for Google sign-in)"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isDeleting}
            aria-label="Confirm your password"
          />
          {deleteError ? (
            <p className="text-destructive text-sm">{deleteError}</p>
          ) : (
            <p className="text-muted-foreground text-xs">
              If deletion is rejected because your session is stale, sign in
              again and retry.
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : null}
            Delete account
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
