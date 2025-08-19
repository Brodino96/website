
import { useTranslation } from "react-i18next"
import Navbar from "./components/navbar"
import { ThemeProvider } from "./components/theme-provider"
import GitHubCarousel from "./components/github-carousel"

export default function App() {

    const { t } = useTranslation()

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
                <Navbar/>
                
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                                {t("landing.greetings")}
                            </h3>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                {t("landing.whoami")}
                            </h1>
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
                                {t("landing.description")}
                            </h2>
                        </div>
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="mt-16 animate-bounce">
                        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="relative py-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
                    <div className="relative z-10">
                        <GitHubCarousel />
                    </div>
                </section>
            </div>
        </ThemeProvider>
    )
}
