import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditorComponent from "./editor/EditorComponent"

export default function ({
  isPostCreatorOpen,
  setIsPostCreatorOpen,
  tags,
}: {
  isPostCreatorOpen: boolean,
  setIsPostCreatorOpen: (isOpen: boolean) => void,
  tags: string[],
}) {
  return (
    <Dialog open={isPostCreatorOpen} onOpenChange={(prev) => setIsPostCreatorOpen(prev)}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <EditorComponent />
      </DialogContent>
    </Dialog>
  )
}