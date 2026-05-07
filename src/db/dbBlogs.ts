import { BlogViewModel } from "../blogs/types/blogersModel";

export const blogs: BlogViewModel[] = [
  {
    id: "1",
    name: "Tech Blog",
    description: "Все о технологиях и программировании",
    websiteUrl: "https://techblog.com",
    createdAt: "1",
    isMembership: false,
  },
  {
    id: "2",
    name: "Travel Stories",
    description: "Путешествия по всему миру",
    websiteUrl: "https://travelstories.com",
    createdAt: "2",
    isMembership: false,
  },
  {
    id: "3",
    name: "Food & Recipes",
    description: "Вкусные рецепты и кулинарные советы",
    websiteUrl: "https://foodrecipes.com",
    createdAt: "3",
    isMembership: false,
  },
  {
    id: "4",
    name: "Fitness Life",
    description: "Здоровый образ жизни и тренировки",
    websiteUrl: "https://fitnesslife.com",
    createdAt: "4",
    isMembership: false,
  },
  {
    id: "5",
    name: "Business News",
    description: "Актуальные новости бизнеса",
    websiteUrl: "https://businessnews.com",
    createdAt: "5",
    isMembership: false,
  },
];
