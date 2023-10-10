export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'object' | 'boolean' | 'date' | 'pesos' | 'array';
  visible?: boolean;
  cssClasses?: string[];
}
