"use client";

import { Button } from "@/components/ui/button";
import { useExampleControllerGetProtectedDataSuspense } from "@repo/queries";
import { Spinner } from "@/components/ui/spinner";

export function ProtectedData() {
  const { data, refetch, isLoading } =
    useExampleControllerGetProtectedDataSuspense();

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refetch"}
      </Button>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner show={true} />
        </div>
      ) : (
        data?.message
      )}
    </div>
  );
}
