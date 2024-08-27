import EditorComponent from "./editor/EditorComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const PostEditor = ({
  isPostEditorOpen,
  setIsPostEditor,
}: {
  isPostEditorOpen: boolean,
  setIsPostEditor: (value: boolean) => void,
}) => {
  return (
    <Dialog open={isPostEditorOpen} onOpenChange={(prev) => setIsPostEditor(prev)}>
      <DialogContent className='w-[50vh] h-[50vh]'>
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

export default PostEditor;