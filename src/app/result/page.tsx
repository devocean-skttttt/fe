"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("search");

  return <>{query} 검색결과</>;
}
