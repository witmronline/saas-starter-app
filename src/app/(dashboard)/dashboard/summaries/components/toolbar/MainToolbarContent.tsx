"use client"

import * as React from "react"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
    ToolbarGroup,
    ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
    ColorHighlightPopover,
    ColorHighlightPopoverContent,
    ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
    LinkPopover,
    LinkContent,
    LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"
import UserMenu from "@/app/(dashboard)/(components)/shared/UserMenu"
import TitleInput from "../common/TitleInput"
import SaveButton from "../common/SaveButton"
import SaveIndicator from "../common/SaveIndicator"

// import { useEditorApp } from "../../context/AppContext";

export const MainToolbarContent = ({
    onHighlighterClick,
    onLinkClick,
    isMobile,
}: {
    onHighlighterClick: () => void
    onLinkClick: () => void
    isMobile: boolean
}) => {
    return (
        <header className="w-full p-2 sm:p-4">
            <div className="flex flex-col min-w-full">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side: title + save controls */}
                    <div className="flex items-center gap-2">
                        <TitleInput />
                        <SaveButton />
                        <SaveIndicator />
                    </div>

                    {/* Right side: user menu */}
                    {/* <UserMenu profile={profile} /> */}
                </div>


                <div className="flex justify-between items-center-safe">
                    <ToolbarGroup>
                        <UndoRedoButton action="undo" />
                        <UndoRedoButton action="redo" />
                    </ToolbarGroup>

                    <Spacer />

                    {/* <ToolbarSeparator /> */}

                    <ToolbarGroup>
                        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
                        <ListDropdownMenu
                            types={["bulletList", "orderedList", "taskList"]}
                            portal={isMobile}
                        />
                        <BlockquoteButton />
                        <CodeBlockButton />
                    </ToolbarGroup>

                    <ToolbarSeparator />

                    <ToolbarGroup>
                        <MarkButton type="bold" />
                        <MarkButton type="italic" />
                        <MarkButton type="strike" />
                        <MarkButton type="code" />
                        <MarkButton type="underline" />
                        {!isMobile ? (
                            <ColorHighlightPopover />
                        ) : (
                            <ColorHighlightPopoverButton onClick={onHighlighterClick} />
                        )}
                        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
                    </ToolbarGroup>

                    <ToolbarSeparator />

                    <ToolbarGroup>
                        <MarkButton type="superscript" />
                        <MarkButton type="subscript" />
                    </ToolbarGroup>

                    <ToolbarSeparator />

                    <ToolbarGroup>
                        <TextAlignButton align="left" />
                        <TextAlignButton align="center" />
                        <TextAlignButton align="right" />
                        <TextAlignButton align="justify" />
                    </ToolbarGroup>

                    <ToolbarSeparator />

                    <ToolbarGroup>
                        <ImageUploadButton text="Add" />
                    </ToolbarGroup>

                    <Spacer />

                    {isMobile && <ToolbarSeparator />}

                    <ToolbarGroup>
                        <ThemeToggle />
                    </ToolbarGroup>
                </div>
            </div>
        </header>
    )
}

export const MobileToolbarContent = ({
    type,
    onBack,
}: {
    type: "highlighter" | "link"
    onBack: () => void
}) => (
    <>
        <ToolbarGroup>
            <Button data-style="ghost" onClick={onBack}>
                <ArrowLeftIcon className="tiptap-button-icon" />
                {type === "highlighter" ? (
                    <HighlighterIcon className="tiptap-button-icon" />
                ) : (
                    <LinkIcon className="tiptap-button-icon" />
                )}
            </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {type === "highlighter" ? (
            <ColorHighlightPopoverContent />
        ) : (
            <LinkContent />
        )}
    </>
)