import React from "react";
import styles from "./styles.module.css";
import { Clock5 } from "lucide-react";

export const BlogCard = ({
    title,
    blurb,
    author,
    gradient,
    readTime,
}: {
    title: string;
    blurb: string;
    author: string;
    gradient: string;
    readTime: number;
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.image} style={{ background: gradient }}>
                Title
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.blurb}>{blurb}</div>
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
