import { useState } from "react";

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

interface MainLoggingContentProps {
    predefinedActivities: PredefinedActivity[];
    userActivityLogs: UserActivityLog[];
    onLogActivity: (activityId: string, metrics: object) => Promise<void>;
}

export const MainLoggingContent = ({ predefinedActivities, userActivityLogs, onLogActivity }: MainLoggingContentProps) => {
    return (
        <div className="w-full h-[calc(100vh-6rem)] flex gap-8 px-8 mt-8">
            <ActivityLogBox userActivityLogs={userActivityLogs} />
            <ActivityLogger 
                predefinedActivities={predefinedActivities}
                onLogActivity={onLogActivity}
            />
        </div>
    );
};

interface ActivityLogBoxProps {
    userActivityLogs: UserActivityLog[];
}

export const ActivityLogBox = ({ userActivityLogs }: ActivityLogBoxProps) => {
    return (
        <div className="sticky w-[450px] h-[550px] rounded-3xl outline bg-gradient-to-b from-[#F3CE51] via-[#FBF2C6] to-[#FDFAE9] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-6">
                <div className="flex items-center justify-center text-4xl font-bold font-coustard p-2">
                    Your Todays Activities
                </div>
                
                <div className="space-y-4">
                    {userActivityLogs.map((log) => (
                        <div key={log.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="font-semibold">
                                {log.activity_id} {/* TODO: Map to activity name */}
                            </div>
                            <div className="text-sm text-gray-600">
                                Carbon Footprint: {log.carbon_footprint.toFixed(2)} kg CO2
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(log.created_at).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                    {userActivityLogs.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                            No activities logged today
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ActivityLoggerProps {
    predefinedActivities: PredefinedActivity[];
    onLogActivity: (activityId: string, metrics: object) => Promise<void>;
}

export const ActivityLogger = ({ predefinedActivities, onLogActivity }: ActivityLoggerProps) => {
    const [searchText, setSearchText] = useState('');
    const [selectedActivity, setSelectedActivity] = useState<PredefinedActivity | null>(null);
    const [metrics, setMetrics] = useState<object>({});

    const filteredActivities = predefinedActivities.filter(activity =>
        activity.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleActivitySelect = (activity: PredefinedActivity) => {
        setSelectedActivity(activity);
        setSearchText('');
    };

    const handleLogActivity = async () => {
        if (selectedActivity) {
            await onLogActivity(selectedActivity.id, metrics);
            setSelectedActivity(null);
            setMetrics({});
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="font-bold font-coustard text-5xl px-5">
                Welcome Back, <span className="text-[#F3CE51]">Sakshi</span>
            </div>
            <div className="py-44 flex flex-col justify-center text-wrap">
                <span className="font-sans text-sm text-center p-2">
                    <span className="font-bold">Search</span> for the activity you performed and enter parameters accordingly
                </span>
                <div className="w-full h-10 rounded-3xl bg-[#FBF2C6] m-3 flex justify-between p-2">
                    <svg width="23px" height="23px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                    <input 
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search activities..."
                        className="flex-1 bg-transparent outline-none px-3 placeholder-gray-500"
                    />

                    <svg className="cursor-pointer hover:bg-[#FDFAE9] rounded-lg" width="23px" height="23px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 9L18 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 13L16 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 17L14 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>

                {searchText && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleActivitySelect(activity)}
                            >
                                {activity.name}
                            </div>
                        ))}
                        {filteredActivities.length === 0 && (
                            <div className="p-2 text-gray-500">No activities found</div>
                        )}
                    </div>
                )}

                {selectedActivity && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-2">{selectedActivity.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{selectedActivity.description}</p>
                        
                        {/* TODO: Add activity-specific input fields based on activity type */}
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                className="w-full p-2 border rounded"
                                onChange={(e) => setMetrics({ ...metrics, duration: parseInt(e.target.value) })}
                            />
                            <button
                                onClick={handleLogActivity}
                                className="w-full bg-[#F3CE51] text-white py-2 rounded-lg hover:bg-[#E5BE41]"
                            >
                                Log Activity
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};