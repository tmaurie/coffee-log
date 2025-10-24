"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";

export function useSafeSearchParams() {
  const sp = useSearchParams();
  const [params, setParams] = React.useState<URLSearchParams>(
    new URLSearchParams(Array.from(sp.entries())),
  );

  React.useEffect(() => {
    setParams(new URLSearchParams(Array.from(sp.entries())));
  }, [sp]);

  return params;
}
