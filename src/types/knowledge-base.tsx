export interface Article {
  id: string;
  title: string;
  content: string;
  readTime: string;
  points?: string[];
}

export interface Category {
  title: string;
  bg: string;
  color: string;
  articles: Article[];
}

export interface DetailProps {
  categorySlug: string;
  initialSearch: string;
  onBack: () => void;
}

export interface CategoryUI {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SavedArticle extends Article {
  categoryTitle: string;
  categorySlug: string;
}