'use client'

import { useEffect, useRef } from 'react'
import { Button } from './Button'

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
}

export function Dialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}: DialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isOpen) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [isOpen])

    return (
        <dialog
            ref={dialogRef}
            className="fixed left-[50%] top-[50%] -translate-x-[55%] -translate-y-[55%] backdrop:bg-foreground/10 backdrop:backdrop-blur-[2.5px] rounded-lg p-0 w-[90vw] md:w-full max-w-md min-h-[200px] shadow-lg border border-muted bg-background"
            onClose={onClose}
        >
            <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                    {title}
                </h3>
                <p className="text-muted">
                    {message}
                </p>
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </dialog>
    )
} 