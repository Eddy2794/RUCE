export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'object' | 'boolean' | 'date';
  visible?: boolean;
  cssClasses?: string[];
}
