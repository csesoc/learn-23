"use client";

import React from "react";
import styles from "./blogArticles.module.css";
import { useRouter } from "next/navigation";

export default function PaginationButton({
    paginationInterval,
    searchParams,
}: {
    paginationInterval: number;
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const router = useRouter();
    return (
        <button
            className={styles.seeMoreBtn}
            onClick={() => {
                if (searchParams === undefined) {
                    let pageNum = paginationInterval + paginationInterval;
                    router.push(`/discover?pagination=${pageNum}`);
                    return;
                }

                let queryParams = "";
                if (searchParams.category !== undefined) {
                    queryParams = `category=${searchParams.category}`;
                }

                if (searchParams.tags !== undefined) {
                    if (searchParams.category !== undefined) {
                        queryParams = `${queryParams}&`;
                    }
                    let tagsParam = "";

                    if (Array.isArray(searchParams.tags)) {
                        tagsParam = `tags=${searchParams.tags.join("&tags=")}`;
                    } else {
                        tagsParam = `tags=${searchParams.tags}`;
                    }
                    queryParams = `${queryParams}${tagsParam}`;
                }

                let pagination = "";
                if (searchParams.pagination === undefined) {
                    let pageNum = paginationInterval + paginationInterval;
                    pagination = pageNum.toString();
                } else {
                    if (!Array.isArray(searchParams.pagination)) {
                        let pageNum =
                            parseInt(searchParams.pagination) +
                            paginationInterval;
                        pagination = pageNum.toString();
                    }
                }

                if (queryParams !== "") {
                    queryParams = `${queryParams}&`;
                }
                queryParams = `${queryParams}pagination=${pagination}`;

                router.push(`/discover?${queryParams}`);
            }}
        >
            See More
        </button>
    );
}
