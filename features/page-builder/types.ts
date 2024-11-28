export type TWidget = {
  id: string;
  parentId?: string;
  name: string;
  props: Record<string, any>;
  style: Record<string, any>;
  isDroppable?: boolean;
};
