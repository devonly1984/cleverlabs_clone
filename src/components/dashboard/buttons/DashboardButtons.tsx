import { Button } from "@/components/ui/button"
import { Headphones, ThumbsUp } from "lucide-react"
import Link from "next/link"

const DashboardButtons = () => {
  return (
    <div className="flex items-center gap-3">
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="mailto:test@gmail.com">
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="mailto:test@gmail.com">
            <Headphones />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
  )
}
export default DashboardButtons