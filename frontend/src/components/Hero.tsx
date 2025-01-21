export const Hero = () => {
    return <div className="w-full">
        <div className="text-black text-7xl text-center font-coustard font-bold tracking-tighter mt-14">
            CarbonPulse
        </div>
        <div className="text-black text-lg text-center mt-2">
            A Simpler Way Towards Adopting More Sustainable Environment!
        </div>
        <div>
            <HeroImage />
        </div>
    </div>
}

const HeroImage = () => {
    return <div className="w-full overflow-hidden">
        <img 
            src="/src/assets/imgs/hero_image.jpg" 
            alt="hero image"
            className="w-full h-96"
        />
    </div>
}