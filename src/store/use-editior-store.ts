import {create} from 'zustand';
import { type Editor } from '@tiptap/react';

interface EditiorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
};

export const useEditorStore = create<EditiorState>((set) => ({
    editor: null,
    setEditor: (editor: Editor | null) => set({ editor })
}));
