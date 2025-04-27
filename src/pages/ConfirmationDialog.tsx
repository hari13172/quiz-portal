"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

interface ConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    stats: {
        answeredCount: number
        notAnsweredCount: number
        answeredPercentage: number
    }
    totalQuestions: number
    onConfirm: () => void
}

export function ConfirmationDialog({ open, onOpenChange, stats, totalQuestions, onConfirm }: ConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        Confirm Submission
                    </DialogTitle>
                    <DialogDescription>Are you sure you want to submit your quiz?</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="rounded-lg bg-orange-50 p-4 text-sm">
                        <p className="font-medium text-orange-800 mb-2">Quiz Summary</p>
                        <ul className="space-y-1 text-orange-700">
                            <li>
                                • You have answered {stats.answeredCount} out of {totalQuestions} questions ({stats.answeredPercentage}
                                %)
                            </li>
                            <li>• {stats.notAnsweredCount} questions are unanswered</li>
                            <li>• You cannot change your answers after submission</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={onConfirm}>
                        Yes, Submit Quiz
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
