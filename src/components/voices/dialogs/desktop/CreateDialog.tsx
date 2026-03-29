"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VoiceCreateProps } from "@/lib/types/type";
import VoiceCreateForm from "../../forms/VoiceCreateForm";
const CreateDialog = ({
  children,
  open,
  onOpenChange,
}: VoiceCreateProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Create custom voice</DialogTitle>
          <DialogDescription>
            Upload or record an audio sample to add a new voice to your
            library
          </DialogDescription>
        </DialogHeader>
        <VoiceCreateForm />
      </DialogContent>
    </Dialog>
  );
};
export default CreateDialog;
