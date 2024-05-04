export enum Category {
  TECHNICAL_TASK = 'Technical Task',
  USER_STORY = 'User Story',
}

interface CategoryColorMap {
  [key: string]: string;
}

export const categoryColors: CategoryColorMap = {
  [Category.TECHNICAL_TASK]: '#1FD7C1',
  [Category.USER_STORY]: '#0038FF',
};

export function getCategoryColor(category: Category): string {
  return categoryColors[category];
}
