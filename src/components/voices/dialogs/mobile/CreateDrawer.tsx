"use client"


import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { VoiceCreateProps } from "@/lib/types/type";
import VoiceCreateForm from "../../forms/VoiceCreateForm";

import { Button } from "@/components/ui/button";

const CreateDrawer = ({
  children,
  open,
  onOpenChange,
}: VoiceCreateProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create custom voice</DrawerTitle>
          <DrawerDescription>
            Upload or record an audio sample to add a new voice to your
            library
          </DrawerDescription>
        </DrawerHeader>
        <VoiceCreateForm scrollable 
        footer={(submit)=>(
          <DrawerFooter>
            {submit}
            <DrawerClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DrawerClose>

          </DrawerFooter>
        )}/>
      </DrawerContent>
    </Drawer>
  );
};
export default CreateDrawer