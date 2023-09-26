import { BlogCard } from "@/components/blog-card/BlogCard";
import React from "react";
import styles from "./styles.module.css";
import { CategorySection } from "./CategorySection";

async function getCategories() {
    const res = await fetch(`http://localhost:1337/api/categories/`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function DiscoverPage() {
    const categories = await getCategories();
    console.log(categories);
    return (
        <div className={styles.container}>
            <div className={styles.articles}>
                {categories.data.map((category: any) => {
                    return (
                        <CategorySection
                            key={category.id}
                            categoryId={category.id}
                            name={category.attributes.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}
