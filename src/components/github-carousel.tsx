import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { ExternalLink, Star } from "lucide-react"
import { useTranslation } from "react-i18next"

interface GitHubRepo {
    name: string
    description: string
    url: string
    stars: string
    language: string | null
}


interface GitHubCarouselProps {
    repositoryUrls?: string[]
}

const defaultRepositoryUrls: string[] = [
    "https://github.com/Brodino96/discord_bot",
    "https://github.com/Brodino96/dotfiles",
    "https://github.com/Brodino96/SummonMounts"
]

export default function GitHubCarousel({ repositoryUrls = defaultRepositoryUrls }: GitHubCarouselProps) {
    const [repositories, setRepositories] = useState<GitHubRepo[]>([])
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation()
    

    const fetchRepoData = async (repoUrl: string): Promise<GitHubRepo | null> => {
        try {
            const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
            if (!match) return null
            
            const [, owner, repo] = match
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
            
            if (!response.ok) return null
            
            const data = await response.json()
            
            return {
                name: data.name,
                description: data.description || "No description available",
                url: data.html_url,
                stars: data.stargazers_count,
                language: data.language
            }
        } catch (error) {
            console.error(`Error fetching repo data for ${repoUrl}:`, error)
            return null
        }
    }

    useEffect(() => {
        const fetchAllRepos = async () => {
            setLoading(true)
            const repoPromises = repositoryUrls.map(url => fetchRepoData(url))
            const results = await Promise.all(repoPromises)
            const validRepos = results.filter((repo): repo is GitHubRepo => repo !== null)
            setRepositories(validRepos)
            setLoading(false)
        }

    fetchAllRepos()
    }, [repositoryUrls])

    const handleRepoClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer")
    }

    if (loading) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-center mb-8">{t("repo.title")}</h2>
                <div className="flex justify-center">
                <div className="text-muted-foreground">{t("repo.loading")}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">{t("repo.title")}</h2>
        
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
            {repositories.map((repo, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                    <div 
                    className="border rounded-lg p-6 h-full cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleRepoClick(repo.url)}
                    >
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg truncate">{repo.name}</h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {repo.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stars.toLocaleString()}</span>
                        </div>
                        {repo.language && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                            {repo.language}
                        </span>
                        )}
                    </div>
                    </div>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </div>
    )
}