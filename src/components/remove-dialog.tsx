import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
  
  interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
  }
  
  export function RemoveDialog({ children, documentId }: RemoveDialogProps) {
    const router = useRouter();
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    return (
      <AlertDialog>
        {/* The trigger should be passed directly */}
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                disabled={isRemoving}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsRemoving(true);
                    remove({id: documentId})
                      .catch(() => toast.error("Failed to remove document"))
                      .then(() => {
                        toast.success("Document removed");
                        router.push("/")
                      })
                      .finally(() => setIsRemoving(false));
                }}
            >
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  