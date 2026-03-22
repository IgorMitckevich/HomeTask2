import {PostViewModel} from "../core/types/postsModel";

export const posts: PostViewModel[] = [{
    id: "1",
    title: "Как выучить TypeScript за месяц",
    shortDescription: "Полное руководство по TypeScript для начинающих",
    content: "TypeScript - это мощный инструмент... (полный текст статьи)",
    blogId: "1",
    blogName: "Tech Blog"
},
    {
    id: "2",
    title: "10 лучших мест в Европе",
    shortDescription: "Куда поехать в следующем отпуске",
    content: "Европа полна удивительных мест... (полный текст статьи)",
    blogId: "2",
    blogName: "Travel Stories"
},
    {
    id: "3",
    title: "Рецепт идеального борща",
    shortDescription: "Секреты приготовления украинского борща",
    content: "Для приготовления борща вам понадобится... (полный текст рецепта)",
    blogId: "3",
    blogName: "Food & Recipes"
}]