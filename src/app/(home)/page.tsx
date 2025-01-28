"use client";

import { usePaginatedQuery } from "convex/react";
import { NavBar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

export const Page = () => {
  const [search] = useSearchParam("search");

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 },
  );
  return (

   <div className="min-h-screen flex flex-col">
    <div className="fixed top-0 left-0 right-0 z-20 h-16 bg-white p-4">
      <NavBar />
    </div>
    <div className="mt-16">
      <TemplatesGallery />
      <DocumentTable 
        documents={results}
        loadMore={loadMore}
        status={status}
      />
    </div>
   </div>
  );
}


export default Page;