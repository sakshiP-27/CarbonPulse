import { App_Topbar } from "../components/App_Topbar"
import { MainLoggingContent } from "../components/LoggingPageContent"

export const Activity_Logging = () => {
    return (
        <div className="min-h-screen bg-[#FEFBEC] p-3">
            <div className="h-24">
                <App_Topbar />
            </div>
            <MainLoggingContent />
        </div>
    )
}