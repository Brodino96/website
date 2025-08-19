import LocaleSelector from "./localeSelector"

export default function Navbar() {
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-4 md:px-8 py-4 border-b border-white/10 bg-black/30 backdrop-blur-[20px] transition-all duration-300">

            <div className="flex items-center gap-4">
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent transition-all duration-300 hover:scale-105 cursor-default">
                    Brodino
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
            
                <LocaleSelector/>
                
                <a 
                    href="https://github.com/Brodino96" 
                    target="_blank"
                    className="transition-all duration-300 hover:scale-110 brightness-75 hover:brightness-100"
                >
                    <img 
                        src="./logos/github.svg" 
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="GitHub"
                    />
                </a>
                
            </div>


        </nav>
    )
}