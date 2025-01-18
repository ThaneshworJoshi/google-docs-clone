import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel"
import { LoaderIcon } from "lucide-react";
import {
    Table,
    TableRow,
    TableHead,
    TableHeader,
    TableCell,
    TableBody
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";

interface DocumentTableProps {
    documents: Doc<"documents">[] | undefined,
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentTable = ({
    documents,
    loadMore,
    status
}: DocumentTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin text-muted-foreground size-5"/>
                </div>
            ): (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="hidden md:table-cell">Shared</TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                    {documents.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground ">
                                No documents found
                            </TableCell>
                        </TableRow>
                    ): (
                        <>
                            {documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))}
                        </>
                        )}
                        </TableBody>
                </Table>
            )} 
        </div>
    )
}