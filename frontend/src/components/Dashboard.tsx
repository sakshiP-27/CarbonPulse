export const DashboardContent = () => {
    return <div className="w-full max-h-full flex outline">
        <div className="p-3 flex flex-col">
            <ProfileCard />
            <div className="my-4">
                <PredictionCard />
            </div>
        </div>
    </div>
};

export const ProfileCard = () => {
    return <div className="h-96 w-80 bg-[#FBF2C6] rounded-xl">

    </div>
};

export const PredictionCard = () => {
    return <div className="h-40 w-80 bg-[#FBF2C6] rounded-xl">

    </div>
};

