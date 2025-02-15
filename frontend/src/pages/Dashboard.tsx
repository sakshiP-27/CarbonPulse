import { App_Topbar } from "../components/App_Topbar";
import { DashboardContent } from "../components/Dashboard";

export const Dashboard = () => {
    return (
        <div className="min-h-screen p-3 bg-[#FEFBEC]">
            <App_Topbar />
            <DashboardContent />
        </div>
    )
};