"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editior-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"  
import { 
    BoldIcon,
    ChevronDownIcon,
    HighlighterIcon,
    ImageIcon,
    ItalicIcon,
    Link2Icon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon,
    UploadIcon
} from "lucide-react";
import { Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: "0", fontSize: "1rem" },
        { label: "Heading 1", value: "1", fontSize: "2.25rem" },
        { label: "Heading 2", value: "2", fontSize: "1.875rem" },
        { label: "Heading 3", value: "3", fontSize: "1.5rem" },
        { label: "Heading 4", value: "4", fontSize: "1.25rem" },
        { label: "Heading 5", value: "5", fontSize: "1.125rem" },
    ];

    const getCurrentHeading = () => {
        for(let level = 1; level < headings.length; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }

        return 'Normal text';
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className="h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-2 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 bg-white border border-[#C7C7C7] z-10 rounded-sm p-1">
                {headings.map(({label, value, fontSize}) => (
                    <button
                    key={value}
                    className={cn("flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        (value === "0" && !editor?.isActive('heading'))|| editor?.isActive("heading", {level: value}) && "bg-neutral-200/80"
                    )} 
                    style={{fontSize}}
                    onClick={() => {
                        if(value === '0'){
                            editor?.chain().focus().setParagraph().run()
                        } else {
                            editor?.chain().focus().toggleHeading({ level: parseInt(value) as Level }).run()
                        }
                    }}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
        
}
const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    
    const fonts = [
        { label: 'Arial', value: 'Arial' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Tahoma', value: 'Tahoma' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Verdana', value: 'Verdana' },
    ];    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-2 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white border border-[#C7C7C7] z-10 rounded-sm">
                {fonts.map(({label, value}) => (
                    <button
                        key={value}
                        className={cn("flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{fontFamily: value}}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                    >
                        <span className="truncate">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
      </DropdownMenu>
    )
}

const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center  rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-sm">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value}} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10">
                <SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const  value = editor?.getAttributes("highlight").color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" z-10 bg-white">
                <SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState<string>("");  

    const onChange = (href: string) => {
        editor?.chain().extendMarkRange('link').setLink({ href }).run();
        setValue("");
    }

    return(
        <DropdownMenu onOpenChange={(open) => {
            if(open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <Link2Icon className="size-4"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-white broder border border-[#C7C7C7] rounded-sm z-10">
                <Input 
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}


const ImageButton = () => {
    const { editor } = useEditorStore();
    const [imageUrl, setImageUrl] = useState<string>("");  
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setImageUrl(src);
    }

    const onUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl)
            }
        }

        input.click();
    }

    const handleImageUrlSubmit = () => {
        if(imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }
    
    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className="size-4"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 rounded-sm border bg-white z-10 cursor-pointer">
                    <DropdownMenuItem className="flex" onClick={onUpload}>
                        <UploadIcon className="size-4 mr-3"/> Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex" onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-3"/> Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image url</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                        <Input 
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleImageUrlSubmit()}
                        />
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    disabled?: boolean;
}


const ToolbarButton = ({ onClick,
     isActive, icon: Icon, disabled }: ToolbarButtonProps) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}
        >
            <Icon className="size-4"/>
        </button>
    );
}


const Toolbar: React.FC = () => {

    const { editor } = useEditorStore();
    console.log({editor})
    const sections : {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain()?.focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print()
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true": "false" )
                }
            }
        ],
        [
            {
                label: 'Bold',
                icon: BoldIcon,
                isActive: editor?.isActive('bold'),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: 'Italic',
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: 'Underline',
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'),
                onClick: () => editor?.chain().focus().toggleUnderline().run()
            }
        ],
        [
            {
                label: 'Comment',
                icon: MessageSquarePlusIcon,
                onClick: () => console.log('Todo: Comment'),
                isActive: false, // TODO: Enable this functionality
            },
            {
                label: 'List Todo',
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive('taskList')
            },
            {
                label: 'Remove Formatting',
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            }
        ]
    ]


    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (<ToolbarButton key={item.label} {...item} disabled={!editor}/>))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* TODO: Font family */}
            <FontFamilyButton />
            {/* TODO: Heading */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            <HeadingLevelButton />
            {/* TODO: Font size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {
                sections[1].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }

            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>

            {/* TODO: Text color */}
            <TextColorButton />
            {/* TODO: Highlight color */}
            <HighlightColorButton />
            {/* TODO: Link */}
            <LinkButton />
            {/* TODO: Image */}
            <ImageButton />
            {/* TODO: Aligh */}
            {/* TODO: Line height */}
            {
                sections[2].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
        </div>
    );
};

export default Toolbar;