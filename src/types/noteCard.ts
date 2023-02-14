import { INotes } from "./note";

export interface INoteCard {
  id?: number;
  body?: string;
  isNew?: boolean;
  setInfoMessage: (info: { color: string; info: string }) => void;
  notes: INotes[];
  setNotes: React.Dispatch<React.SetStateAction<INotes[]>>;
}
