"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState<string>("");

    return (
        <input
            className={styles.container}
            type="text"
            value={searchInput}
            onChange={(e: ChangeEvent) =>
                setSearchInput((e.target as HTMLInputElement).value)
            }
        />
    );
}
