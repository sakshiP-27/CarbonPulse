import { useState, useEffect } from "react";
import { App_Topbar } from "../components/App_Topbar"
import { MainLoggingContent } from "../components/LoggingPageContent"
import axios from "axios";

interface PredefinedActivity {
    id: string;
    name: string;
    description: string;
}

interface UserActivityLog {
    id: string;
    user_id: string;
    activity_id: string;
    carbon_footprint: number;
    created_at: string;
}

export const Activity_Logging = () => {
    const [predefinedActivities, setPredefinedActivities] = useState<PredefinedActivity[]>([]);
    const [userActivityLogs, setUserActivityLogs] = useState<UserActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch predefined activities
    useEffect(() => {
        const fetchPredefinedActivities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/activities');
                if (response.data.status) {
                    setPredefinedActivities(response.data.data);
                }
            } catch (err) {
                setError('Failed to fetch predefined activities');
                console.error('Error fetching activities:', err);
            }
        };

        fetchPredefinedActivities();
    }, []);

    // Fetch user activity logs
    useEffect(() => {
        const fetchUserActivityLogs = async () => {
            try {
                // TODO: Replace 'user123' with actual user ID from auth context
                const response = await axios.post('http://localhost:3000/api/activities/user-logs', {
                    user_id: 'user123'
                });
                if (response.data.status) {
                    setUserActivityLogs(response.data.data);
                }
            } catch (err) {
                setError('Failed to fetch user activity logs');
                console.error('Error fetching user logs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserActivityLogs();
    }, []);

    // Function to log new activity
    const logNewActivity = async (activityId: string, metrics: object) => {
        try {
            // TODO: Replace 'user123' with actual user ID from auth context
            const response = await axios.post('http://localhost:3000/api/activities/log', {
                id: Date.now().toString(), // Generate a unique ID
                user_id: 'user123',
                activity_id: activityId,
                metrics: metrics
            });

            if (response.data.status) {
                // Refresh user activity logs after successful logging
                const logsResponse = await axios.post('http://localhost:3000/api/activities/user-logs', {
                    user_id: 'user123'
                });
                if (logsResponse.data.status) {
                    setUserActivityLogs(logsResponse.data.data);
                }
            }
        } catch (err) {
            setError('Failed to log new activity');
            console.error('Error logging activity:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FEFBEC] p-3 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FEFBEC] p-3 flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FEFBEC] p-3">
            <div className="h-24">
                <App_Topbar />
            </div>
            <MainLoggingContent 
                predefinedActivities={predefinedActivities}
                userActivityLogs={userActivityLogs}
                onLogActivity={logNewActivity}
            />
        </div>
    )
}