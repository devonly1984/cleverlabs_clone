import { useState } from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { voicesSearchParams } from "@/lib/nuqs/params";
import CreateDialog from "../dialogs/desktop/CreateDialog";
import CreateDrawer from "../dialogs/mobile/CreateDrawer";
const VoicesToolbar = () => {
  const [query, setQuery] = useQueryState(
    "query",
    voicesSearchParams.query,
  );
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
          All Libraries
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover your voices, or make your own
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <InputGroup className="lg:max-w-sm">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search voices..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
            />
          </InputGroup>
          <div className="ml-auto hidden lg:block">
            <CreateDialog>
              <Button size={"sm"}>
                <Sparkles />
                Custom Voice
              </Button>
            </CreateDialog>
          </div>
          <div className="lg:hidden">
            <CreateDrawer>
              <Button size={"sm"} className="w-full">
                <Sparkles />
                Custom Voice
              </Button>
            </CreateDrawer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VoicesToolbar;
