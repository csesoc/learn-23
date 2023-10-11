import React from "react";
import "dotenv/config";
import styles from "./styles.module.css";
import { DiscoverPageHeader } from "./DiscoverPageHeader";
import { BlogArticles } from "./BlogArticles";

async function getCategories() {
    const res = await fetch(`${process.env.SERVER_ROUTE}api/categories/`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const categories: any[] = data.data.map((c: any) => {
        return {
            id: c.id,
            name: c.attributes.name,
        };
    });

    return categories;
}

async function getTags() {
    const res = await fetch(`${process.env.SERVER_ROUTE}api/tags/`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    const tags: any[] = data.data.map((t: any) => {
        return {
            id: t.id,
            name: t.attributes.name,
        };
    });

    return tags;
}

export default async function DiscoverPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const categories: { id: string; name: string }[] = await getCategories();
    const tags: { id: string; name: string }[] = await getTags();
    console.log(searchParams);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <DiscoverPageHeader
                    tags={tags}
                    categories={categories}
                    searchParams={searchParams}
                />
                <div className={styles.articles}>
                    <BlogArticles searchParams={searchParams} />
                    {/* {categories.map((category: any) => {
                        return (
                            <CategorySection
                                key={category.id}
                                categoryId={category.id}
                                name={category.name}
                            />
                        );
                    })} */}
                </div>
            </div>
        </div>
    );
}
