import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "../ui/button";

const CustomModal = ({
  // Modal Control
  open,
  setOpen,
  
  // Trigger Props
  trigger, // Custom trigger component
  triggerAsChild = false,
  
  // Built-in Trigger (jika tidak ada custom trigger)
  textButton,
  icon,
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName = "",
  
  // Modal Content
  title,
  showHeader = true,
  children,
  
  // Modal Styling
  contentClassName = "",
  headerClassName = "",
  titleClassName = "",
  
  // Modal Size Presets
  size = "default", // xs, sm, default, lg, xl, full
  
  // Advanced Props
  closeOnClickOutside = true,
  showCloseButton = true,
  ...props
}) => {
  // Size presets
  const sizeClasses = {
    xs: "max-w-sm",
    sm: "max-w-md", 
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-[95vw]"
  };

  // Default content class
  const defaultContentClass = `w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`;

  // Render custom trigger or default trigger
  const renderTrigger = () => {
    if (trigger) {
      return triggerAsChild ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger>
          {trigger}
        </DialogTrigger>
      );
    }

    // Default trigger
    if (textButton) {
      return (
        <DialogTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={`flex items-center gap-2 ${triggerClassName}`}
          >
            {icon}
            {textButton}
          </Button>
        </DialogTrigger>
      );
    }

    return null;
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={setOpen}
      {...props}
    >
      {renderTrigger()}
      
      <DialogContent 
        className={`${defaultContentClass} ${contentClassName}`}
        onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
      >
        {showHeader && (title || showCloseButton) && (
          <DialogHeader className={headerClassName}>
            {title && (
              <DialogTitle className={`text-xl font-semibold ${titleClassName}`}>
                {title}
              </DialogTitle>
            )}
          </DialogHeader>
        )}
        
        <div className={showHeader ? "mt-4" : ""}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;