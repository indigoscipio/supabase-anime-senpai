import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";

import MainDashboard from "@/components/MainDashboard";

export default async function Home() {
  const router = useRouter();
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  router.refresh();

  return (
    <main>
      <MainDashboard user={user} profileData={profileData} />
    </main>
  );
}
