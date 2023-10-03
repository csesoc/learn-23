import { BlogCard } from "@/components/blog-card/BlogCard";
import React from "react";
import 'dotenv/config'
import styles from "./styles.module.css";
import { CategorySection } from "./CategorySection";
import SearchBar from "./SearchBar";

async function getCategories() {
    const res = await fetch(`${process.env.SERVER_ROUTE}api/categories/`, {
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
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Discover</h1>
                {/* <div className={styles.searchBarContainer}>
                    <SearchBar />
                    <input type="text" className={styles.searchBar} />
                    <button className={styles.filterBtn}>Filter</button>
                </div> */}
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
        </div>
    );
}
