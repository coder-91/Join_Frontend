export enum Priority {
  URGENT = 'Urgent',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export const PriorityProperties = {
  [Priority.URGENT]: { color: '#FF7A50', icon: 'keyboard_double_arrow_up' },
  [Priority.MEDIUM]: { color: '#FFA800', icon: 'keyboard_double_arrow_right' },
  [Priority.LOW]: { color: '#7AE229', icon: 'keyboard_double_arrow_down' }
};
