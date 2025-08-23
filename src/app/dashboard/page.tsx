import { Card } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Stat 1" description="Dummy content here" />
                <Card title="Stat 2" description="Dummy content here" />
                <Card title="Stat 3" description="Dummy content here" />
            </div>
        </div>
    );
}
