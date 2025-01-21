export const MainContent = () => {
    return <div className="w-full px-12">
        <CardBoard />
        <div className="flex justify-center mt-8 text-black text-5xl text-center font-coustard font-bold tracking-tighter">
            Features
        </div>
        <Cards />
    </div>
}

export const CardBoard = () => {
    return <div className="transition-all duration-100 h-80 rounded-2xl flex justify-between items-center -translate-y-12 backdrop-blur-xl hover:outline outline-offset-4">
        <div className="w-7/10 flex flex-col justify-center space-y-4 p-8"> {/* Heading */}
            <span className="font-coustard font-bold text-green-800 text-3xl text-center">
                Track Your Carbon Footprint, Make A Difference
            </span>
            <span className="text-gray-600 text-base text-center"> {/* Sub Content */}
                A comprehensive and easy to use tool with personalized recommendations to help you aciheve your carbon footprint reduction goals. Make the Earth greener again!
            </span>
            <div className="flex justify-center">
                <button className="bg-green-800 text-white rounded-lg px-6 py-3 text-base font-semibold shadow-md hover:bg-green-700 transition-colors duration-200">
                    Get Started
                </button>
            </div>
        </div>
        <div className="w-3/10 h-full flex items-center justify-center px-5 py-2"> {/* Image */}
            <img src="/src/assets/imgs/content-image2.jpg" alt="sapling" className="w-96 h-72 rounded-xl" />
        </div>
    </div>
}

export const Cards = () => {
    return <div className="flex w-full p-2 mt-4 space-x-4">
        {/* Card 1 */}
        <div className="w-1/3 h-96 p-5 flex-col hover:shadow-2xl transition-shadow duration-200">
            <div className="w-full h-3/5">
                <img 
                    src="/src/assets/imgs/Activity_Tracker.png" 
                    alt="Activity Tracker"
                    className="w-full h-full" 
                />
            </div>
            <div className="w-full h-2/5 px-2 py-5">
                <span className="font-bold text-xl">Daily Tracker</span>
                <br />
                <span>
                    Track you daily carbon footprints through an interactive activity log.
                </span>
            </div>
        </div>
        {/* Card 2 */}
        <div className="w-1/3 h-96 p-5 flex-col hover:shadow-2xl transition-shadow duration-200">
            <div className="w-full h-3/5">
                <img 
                    src="/src/assets/imgs/Activity_Prediction.png" 
                    alt="Activity Prediction"
                    className="w-full h-full" 
                />
            </div>
            <div className="w-full h-2/5 px-2 py-5">
                <span className="font-bold text-xl">Activity Prediction</span>
                <br />
                <span>
                    An effective prediction of carbon emmissions a user would produce next day based on current days' activities
                </span>
            </div>
        </div>
        {/* Card 3 */}
        <div className="w-1/3 h-96 p-5 flex-col hover:shadow-2xl transition-shadow duration-200">
            <div className="w-full h-3/5">
                <img 
                    src="/src/assets/imgs/Personalized_Recommendation.png" 
                    alt="Personalized Recommendation"
                    className="w-full h-full" 
                />
            </div>
            <div className="w-full h-2/5 px-2 py-5">
                <span className="font-bold text-xl">Personalized Recommendations</span>
                <br />
                <span>
                    Get personalized recommendations to reduce your carbon footprint based on your daily activities.
                </span>
            </div>
        </div>
    </div>
}