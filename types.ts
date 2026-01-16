
export type Category = 'All' | 'Nature' | 'Architecture' | 'Urban' | 'Portrait' | 'Abstract';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: Category;
  description: string;
  author: string;
}

export interface AIInsight {
  analysis: string;
  suggestedTags: string[];
  vibe: string;
}
