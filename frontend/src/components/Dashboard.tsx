import { useState, useEffect } from 'react';
import axios from 'axios';

interface DashboardData {
    topFiveActivities: {
        activities: Array<{
            title: string;
            carbon_footprint: number;
        }>;
    };
    todayActivities: Array<any>;
    prediction: {
        predicted_footprint: number;
    };
    recommendation: {
        title: string;
        description: string;
        carbon_footprint: number;
    };
}

export const DashboardContent = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const response = await axios.post('http://localhost:3000/api/dashboard', {
                    userId
                });

                if (response.data.status) {
                    setDashboardData(response.data.data);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="w-full max-h-full flex">
            <div className="w-1/3 p-3 flex flex-col">
                <ProfileCard userData={dashboardData} />
                <PredictionCard prediction={dashboardData?.prediction} />
            </div>
            <div className="w-2/3 p-3 flex flex-col items-center">
                <div className="h-2/4">
                    <SummaryCard activities={dashboardData?.todayActivities} />
                </div>
                <div className="flex flex-row h-2/4 p-2">
                    <RecommendationCard recommendation={dashboardData?.recommendation} />
                    <ActivityListCard activities={dashboardData?.topFiveActivities.activities} />
                </div>
            </div>
        </div>
    );
};

/* Left Lane */
export const ProfileCard = ({ userData }: { userData: DashboardData | null }) => {
    return (
        <div className="h-[28rem] w-96 bg-[#FBF2C6] rounded-xl mx-10 p-4">
            <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Today's Activities</h3>
                    <p>{userData?.todayActivities.length || 0} activities recorded</p>
                </div>
                <div>
                    <h3 className="font-semibold">Total Carbon Footprint</h3>
                    <p>{userData?.todayActivities.reduce((sum, activity) => sum + activity.carbon_footprint, 0) || 0} kg CO2</p>
                </div>
            </div>
        </div>
    );
};

export const PredictionCard = ({ prediction }: { prediction: DashboardData['prediction'] | undefined }) => {
    return (
        <div className="h-[11rem] w-96 bg-[#FBF2C6] rounded-xl my-4 mx-10 p-4">
            <h2 className="text-xl font-bold mb-2">Carbon Footprint Prediction</h2>
            <p className="text-2xl font-bold text-blue-600">
                {prediction?.predicted_footprint || 0} kg CO2
            </p>
            <p className="text-sm text-gray-600">Predicted for today</p>
        </div>
    );
};

/* Right Lane */
export const SummaryCard = ({ activities }: { activities: DashboardData['todayActivities'] | undefined }) => {
    return (
        <div className="w-[50rem] h-[20rem] bg-[#FBF2C6] rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
            <div className="grid grid-cols-2 gap-4">
                {activities?.map((activity, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg">
                        <h3 className="font-semibold">{activity.activity.title}</h3>
                        <p>{activity.carbon_footprint} kg CO2</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const RecommendationCard = ({ recommendation }: { recommendation: DashboardData['recommendation'] | undefined }) => {
    return (
        <div className="w-[19.5rem] h-[19rem] bg-[#FBF2C6] rounded-xl mx-2 p-4">
            <h2 className="text-xl font-bold mb-2">Recommendation</h2>
            <h3 className="font-semibold mb-2">{recommendation?.title || 'No recommendations yet'}</h3>
            <p className="text-sm mb-2">{recommendation?.description || 'Start tracking activities to get recommendations'}</p>
            <p className="text-sm text-gray-600">
                Potential savings: {recommendation?.carbon_footprint || 0} kg CO2
            </p>
        </div>
    );
};

export const ActivityListCard = ({ activities }: { activities: DashboardData['topFiveActivities']['activities'] | undefined }) => {
    return (
        <div className="w-[29.5rem] h-[19rem] bg-[#FBF2C6] rounded-xl mx-2 p-4">
            <h2 className="text-xl font-bold mb-4">Top Activities</h2>
            <div className="space-y-2">
                {activities?.map((activity, index) => (
                    <div key={index} className="bg-white p-2 rounded-lg flex justify-between">
                        <span>{activity.title}</span>
                        <span className="font-semibold">{activity.carbon_footprint} kg CO2</span>
                    </div>
                ))}
            </div>
        </div>
    );
};