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
    title, children, textButton, open, setOpen, icon, className
}) => {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button 
            variant="outline"
            className={`flex items-center gap-2 px-5 py-6 rounded-lg min-w-[200px] text-base ${className}`}>
                {icon}
                {textButton}
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-5 bg-white rounded-xl shadow-lg">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                    {title}
                </DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
}


export default CustomModal