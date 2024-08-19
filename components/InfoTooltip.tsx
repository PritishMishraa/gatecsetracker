import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

function InfoTooltip({ totalDuration }: { totalDuration: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="inline h-4 w-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{totalDuration}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default InfoTooltip