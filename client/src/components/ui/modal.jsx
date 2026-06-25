import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function Modal({ open, onOpenChange, title, description, icon, className, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-md p-8 bg-card text-foreground border border-border rounded-2xl shadow-xl flex flex-col items-center ${className ?? ""}`}
      >
        {(title || description || icon) && (
          <DialogHeader className="flex flex-col items-center text-center">
            {icon && <div className="mb-4">{icon}</div>}
            {title && (
              <DialogTitle className="text-2xl font-extrabold text-foreground leading-snug">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-muted-foreground text-sm mt-1.5">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
