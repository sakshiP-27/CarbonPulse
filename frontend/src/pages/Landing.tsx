import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { MainContent } from "../components/MainContent"
import { Topbar } from "../components/Topbar"

export const Landing = () => {
    return <div>
        <Topbar />
        <Hero />
        <MainContent />
        <Footer />
    </div>
}