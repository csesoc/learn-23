"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { ListFilter } from "lucide-react";
import Filter from "./Filter";
import { useHoverDirty } from "react-use";

export const DiscoverPageHeader = ({
    tags = [],
    categories = [],
    searchParams,
}: {
    tags: { id: string; name: string }[];
    categories: { id: string; name: string }[];
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const isFilterHovered = useHoverDirty(filterRef);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const isButtonHovered = useHoverDirty(buttonRef);

    useEffect(() => {
        const handleOutsideOpenFilterClick = (e: MouseEvent) => {
            if (isFilterOpen && !isFilterHovered && !isButtonHovered) {
                setIsFilterOpen(false);
            }
        };
        window.addEventListener("click", handleOutsideOpenFilterClick);

        return () => {
            window.removeEventListener("click", handleOutsideOpenFilterClick);
        };
    }, [isFilterOpen, isFilterHovered, isButtonHovered]);

    return (
        <div>
            <div className={styles.header}>
                <h1>Discover</h1>
                <button
                    ref={buttonRef}
                    className={styles.filterBtn}
                    type="button"
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                >
                    <ListFilter size={16} />
                    <span>Filter</span>
                </button>
                <Filter
                    ref={filterRef}
                    isOpen={isFilterOpen}
                    tags={tags}
                    categories={categories}
                    searchParams={searchParams}
                    closeFilter={() => {
                        setIsFilterOpen(false);
                    }}
                />
            </div>
        </div>
    );
};
