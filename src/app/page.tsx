'use client'
import { api } from "@/trpc/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const helloapi = api.hello.useQuery();
  console.log(helloapi.data?.message);
  const session = useSession();
  if (session.status === "unauthenticated") return redirect('/auth/signin')
  return redirect('/dashboard')
}
