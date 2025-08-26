// src/app/(dashboard)/dashboard/[userId]/page.tsx
import Noope from "../(components)/App/Noope";

export default function DashboardPage({
    params,
}: {
    params: { userId: string };
}) {
    return <Noope userId={params.userId} />;
}
