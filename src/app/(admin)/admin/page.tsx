import LineChart from "@/components/admin/statistic/LineChart";
import PieChart from "@/components/admin/statistic/PieChart";

export default async function AdminIndex() {
    return (
        <>
            <h1>Admin Page</h1>

            <h2>Statistic</h2>

            <div className="w-96">
                <div className="flex justify-between">
                    <PieChart />
                    <LineChart />
                </div>
            </div>
        </>
    );
}
