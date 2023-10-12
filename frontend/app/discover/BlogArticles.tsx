import React from "react";
import styles from "./blogArticles.module.css";
import { BlogCard } from "@/components/blog-card/BlogCard";
import "dotenv/config";
import PaginationButton from "./PaginationButton";

const PAGINATION_INTERVAL = 9;

const getArticles = async (
    searchParams:
        | {
              [key: string]: string | string[] | undefined;
          }
        | undefined
) => {
    if (searchParams === undefined) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ROUTE}api/articles?pagination[start]=0&pagination[limit]=${PAGINATION_INTERVAL}&pagination[withCount]=true&sort[0]=updatedAt:desc`,
            {
                cache: "no-store",
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        return res.json();
    }

    let strapiQueryString = `${process.env.NEXT_PUBLIC_SERVER_ROUTE}api/articles?`;

    if (searchParams.category !== undefined) {
        strapiQueryString = `${strapiQueryString}filters[category][id][$eq]=${searchParams.category}`;
    }

    if (searchParams.tags !== undefined) {
        if (searchParams.category !== undefined) {
            strapiQueryString = `${strapiQueryString}&`;
        }

        let tagQueryStr = "";

        if (Array.isArray(searchParams.tags)) {
            searchParams.tags.map((t) => {
                tagQueryStr = `${tagQueryStr}filters[$and][${t}][tags][id][$eq]=${t}&`;
            });
            tagQueryStr = tagQueryStr.slice(0, -1); // Remove last &
        } else {
            tagQueryStr = `${tagQueryStr}filters[tags][id][$eq]=${searchParams.tags}`;
        }

        strapiQueryString = `${strapiQueryString}${tagQueryStr}`;
    }

    if (
        searchParams.category !== undefined ||
        searchParams.tags !== undefined
    ) {
        strapiQueryString = `${strapiQueryString}&`;
    }
    if (searchParams.pagination !== undefined) {
        strapiQueryString = `${strapiQueryString}pagination[start]=0&pagination[limit]=${searchParams.pagination}&pagination[withCount]=true&sort[0]=updatedAt:desc`;
    } else {
        strapiQueryString = `${strapiQueryString}pagination[start]=0&pagination[limit]=${PAGINATION_INTERVAL}&pagination[withCount]=true&sort[0]=updatedAt:desc`;
    }

    const res = await fetch(`${strapiQueryString}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
    // Example full query: http://localhost:1337/api/articles?filters[$and][0][category][id][$eq]=1&filters[$and][1][tags][id][$eq]=2&populate=*
};

type Article = {
    data: any;
};

export const BlogArticles = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const articles = await getArticles(searchParams);

    return (
        <div className={styles.container}>
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
                <PaginationButton
                    paginationInterval={PAGINATION_INTERVAL}
                    searchParams={searchParams}
                />
            )}
        </div>
    );
};
