import {globalState} from "@/lib/core/state.ts";
import {Button} from "@/lib/ui/button.tsx";

export const ShadcnButton: React.FC<{ label: string }> = ({ label }) => {
    return (
        <Button onClick={() => globalState.increment()}>
            {label} (shadcn/ui)
        </Button>
    );
};