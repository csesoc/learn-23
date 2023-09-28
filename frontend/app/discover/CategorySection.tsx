"use client";
import React, { useEffect, useState } from "react";
import styles from "./categorySection.module.css";
import { BlogCard } from "@/components/blog-card/BlogCard";

const getCategoryArticles = async (categoryId: any, pagination: number) => {
    const res = await fetch(
        `http://localhost:1337/api/articles?filters[category][id][$eq]=${categoryId}&pagination[start]=0&pagination[limit]=${pagination}&pagination[withCount]=true&sort[0]=updatedAt:desc`,
        {
            cache: "no-store",
        }
    );
    http: if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

type Article = {
    data: any;
};

export const CategorySection = ({
    categoryId,
    name,
}: {
    categoryId: string;
    name: string;
}) => {
    // const articles = await getCategoryArticles(categoryId);
    const [articles, setArticles] = useState<any>({
        data: [],
        meta: { pagination: { total: 0 } },
    });
    const [articleNum, setArticleNum] = useState(3);
    useEffect(() => {
        const setArticlesInit = async () => {
            const res = await getCategoryArticles(categoryId, articleNum);
            setArticles(res);
        };
        setArticlesInit();
    }, [categoryId, articleNum]);

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
            {articles.meta.pagination.total !== articles.data.length && (
                <button
                    className={styles.seeMoreBtn}
                    onClick={() => setArticleNum((prev) => prev + 3)}
                >
                    See More
                </button>
            )}
        </div>
    );
};
