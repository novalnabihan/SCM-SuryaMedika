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
    title, children, textButton, open, setOpen, icon
}) => {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base">
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