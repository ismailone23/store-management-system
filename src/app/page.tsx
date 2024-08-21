'use client'

import ELink from "@/components/shared/ELink";
import { api } from "@/trpc/client";

export default function Home() {
  const helloapi = api.hello.useQuery();
  console.log(helloapi.data?.message);

  return (
    <>
      <div>hello</div>
      <ELink href="/auth/signin" title="signin" />
    </>
  );
}
