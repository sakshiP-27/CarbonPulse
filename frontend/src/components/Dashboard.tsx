export const DashboardContent = () => {
    return <div className="w-full max-h-full flex">
        <div className="w-1/3 p-3 flex flex-col">
            <ProfileCard />
            <PredictionCard />
        </div>
        <div className="w-2/3 p-3 flex flex-col items-center">
            <div className="h-2/4">
                <SummaryCard />
            </div>
            <div className="flex flex-row h-2/4 p-2">
                <RecommendationCard />
                <ActivityListCard />
            </div>
        </div>
    </div>
};

/* Left Lane */
export const ProfileCard = () => {
    return <div className="h-[28rem] w-96 bg-[#FBF2C6] rounded-xl mx-10">

    </div>
};

export const PredictionCard = () => {
    return <div className="h-[11rem] w-96 bg-[#FBF2C6] rounded-xl my-4 mx-10">

    </div>
};

/* Right Lane */
export const SummaryCard = () => {
    return <div className="w-[50rem] h-[20rem] bg-[#FBF2C6] rounded-xl">

    </div>
};

export const RecommendationCard = () => {
    return <div className="w-[19.5rem] h-[19rem] bg-[#FBF2C6] rounded-xl mx-2">

    </div>
};

export const ActivityListCard = () => {
    return <div className="w-[29.5rem] h-[19rem] bg-[#FBF2C6] rounded-xl mx-2">

    </div>
};