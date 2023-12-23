import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import MainDashboard from "@/components/MainDashboard";

export default async function Home() {
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

  return (
    <main>
      <MainDashboard user={user} profileData={profileData} />
    </main>
  );
}
