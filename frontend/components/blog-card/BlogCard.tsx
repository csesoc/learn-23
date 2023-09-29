"use client";

import React from "react";
import styles from "./styles.module.css";
import { Clock5 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BlogCard = ({
    blogId,
    title,
    shortTitle,
    description,
    author,
    gradient,
    readTime,
}: {
    blogId: string;
    title: string;
    shortTitle: string;
    description: string;
    author: string;
    gradient: string;
    readTime: number;
}) => {
    const { push } = useRouter();

    return (
        <div
            className={styles.container}
            onClick={() => {
                push(`articles/${blogId}`);
            }}
        >
            <div className={styles.image} style={{ background: gradient }}>
                {shortTitle}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.footer}>
                <div className={styles.author}>{author}</div>
                <div className={styles.readTime}>
                    <Clock5 size={14} />
                    <span>{readTime} min</span>
                </div>
            </div>
        </div>
    );
};
