export interface INoteCard {
  id?: string;
  body?: string;
  isNew?: boolean;
  setInfoMessage: (info: { color: string; info: string }) => void;
}
