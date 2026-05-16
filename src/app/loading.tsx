import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-4 w-24 mb-6 bg-[#E8DFD1]" />
        <Skeleton className="h-12 w-2/3 mb-4 bg-[#E8DFD1]" />
        <Skeleton className="h-12 w-1/2 mb-8 bg-[#E8DFD1]" />
        <Skeleton className="h-5 w-full max-w-xl mb-3 bg-[#E8DFD1]" />
        <Skeleton className="h-5 w-4/5 max-w-xl mb-10 bg-[#E8DFD1]" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full bg-[#E8DFD1]" />
          <Skeleton className="h-12 w-40 rounded-full bg-[#E8DFD1]" />
        </div>
      </div>
    </div>
  );
}
