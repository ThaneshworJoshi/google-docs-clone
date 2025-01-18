import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({
    documentId,
    title,
    onNewTab,
}: DocumentMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border">
            <RemoveDialog documentId={documentId}>
                <DropdownMenuItem
                    onSelect={e => e.preventDefault()}
                    onClick={e => e.stopPropagation()}
                    className="flex px-2 py-1 hover:bg-gray-50"
                >
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                </DropdownMenuItem>
            </RemoveDialog>
            <DropdownMenuItem
                onClick={() => onNewTab(documentId)}
                className="flex px-2 py-1 hover:bg-gray-50"
            >
                <ExternalLinkIcon className="size-4 mr-2" />
                Open in a new tab
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}