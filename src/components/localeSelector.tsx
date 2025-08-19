import i18next from "i18next"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"

export default function LocaleSelector() {

    const { t } = useTranslation()
    const [ , setLanguage ] = useState(i18next.language)

    function handleLanguageChange(selectedLanguage: string) {  
        setLanguage(selectedLanguage)
        i18next.changeLanguage(selectedLanguage)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{t("lang.button")}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t("lang.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup onValueChange={handleLanguageChange}>
                    <DropdownMenuRadioItem value="en">{t("lang.en")}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="it">{t("lang.it")}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}