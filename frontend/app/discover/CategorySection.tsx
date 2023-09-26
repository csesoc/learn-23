import React from "react";
import styles from "./categorySection.module.css";
import { BlogCard } from "@/components/blog-card/BlogCard";

const getCategroyArticles = async (categoryId: any) => {
    const res = await fetch(
        `http://localhost:1337/api/articles?filters[category][id][$eq]=${categoryId}`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export const CategorySection = async ({
    categoryId,
    name,
}: {
    categoryId: string;
    name: string;
}) => {
    const articles = await getCategroyArticles(categoryId);
    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <div className={styles.articlesContainer}>
                {articles.data.map((a: any) => (
                    <BlogCard
                        key={a.id}
                        blogId={a.id}
                        title={a.attributes.title}
                        shortTitle={a.attributes.shortTitle}
                        description={a.attributes.description}
                        author={a.attributes.author}
                        readTime={7}
                        gradient={a.attributes.gradient}
                    />
                ))}
            </div>
        </div>
    );
};
