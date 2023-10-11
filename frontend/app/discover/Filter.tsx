import React, { useState, forwardRef } from "react";
import styles from "./filter.module.css";
import { useRouter } from "next/navigation";
import Select, { SingleValue } from "react-select";

const initSelectedTags = (
    tags: { id: string; name: string }[],
    searchParams?: { [key: string]: string | string[] | undefined }
) => {
    let tagsInit: { [key: string]: boolean } = {};
    tags.forEach((t) => {
        tagsInit[t.id] = false;
    });
    if (searchParams !== undefined && Array.isArray(searchParams.tags)) {
        searchParams.tags.forEach((tid) => {
            tagsInit[tid] = true;
        });
    }

    return tagsInit;
};

const initSelectedCategory = (searchParams?: {
    [key: string]: string | string[] | undefined;
}) => {
    if (searchParams !== undefined && searchParams.category !== undefined) {
        return searchParams.category;
    } else {
        return "-1";
    }
};

type Props = {
    isOpen: boolean;
    tags: { id: string; name: string }[];
    categories: { id: string; name: string }[];
    searchParams?: { [key: string]: string | string[] | undefined };
    closeFilter: () => void;
};

const Filter = forwardRef<HTMLDivElement, Props>(function Filter(
    { isOpen, tags, categories, searchParams, closeFilter },
    ref
) {
    const [selectedCategory, setSelectedCategory] = useState(
        initSelectedCategory(searchParams)
    );
    const [selectedTags, setSelectedTags] = useState<{
        [key: string]: boolean;
    }>(initSelectedTags(tags, searchParams));

    const router = useRouter();

    const handleSubmit = () => {
        let url = "/discover";
        let categoryParam = "";
        if (selectedCategory !== "-1") {
            categoryParam = `category=${selectedCategory}`;
        }
        let tagsParam = "";
        let tagsParamArr = [];
        for (const t in selectedTags) {
            if (selectedTags[t] === true) {
                tagsParamArr.push(t);
            }
        }
        if (tagsParamArr.length !== 0) {
            tagsParam = `tags=${tagsParamArr.join("&tags=")}`;
        }

        if (categoryParam !== "" && tagsParam !== "") {
            url = `${url}?${categoryParam}&${tagsParam}`;
        } else if (categoryParam !== "") {
            url = `${url}?${categoryParam}`;
        } else if (tagsParam !== "") {
            url = `${url}?${tagsParam}`;
        }

        router.push(url);
        closeFilter();
    };

    const selectOptions = [{ id: "-1", name: "All" }, ...categories].map(
        (c) => {
            return {
                value: c.id,
                label: c.name,
            };
        }
    );

    const handleSelect = (
        selectedOption: SingleValue<{
            value: string;
            label: string;
        }>
    ) => {
        if (selectedOption) setSelectedCategory(selectedOption.value);
    };

    return (
        <div
            ref={ref}
            className={
                isOpen
                    ? `${styles.container} ${styles.openContainer}`
                    : `${styles.container}`
            }
        >
            <div className={styles.content}>
                <div className={styles.categoriesContainer}>
                    <label htmlFor="categories" className={styles.title}>
                        Category
                    </label>
                    <Select
                        options={selectOptions}
                        onChange={handleSelect}
                        name="categories"
                        id="categories"
                    />
                </div>
                <div className={styles.tagsContainer}>
                    <div className={styles.title}>Tags</div>
                    <div className={styles.tagsGrid}>
                        {tags.map((t) => {
                            return (
                                <div key={t.id}>
                                    <input
                                        type="checkbox"
                                        id={t.id}
                                        name={t.id}
                                        checked={selectedTags[t.id]}
                                        onChange={(e) => {
                                            const newSelectedTags = {
                                                ...selectedTags,
                                            };
                                            newSelectedTags[t.id] =
                                                e.target.checked;
                                            setSelectedTags(newSelectedTags);
                                        }}
                                    />
                                    <label htmlFor={t.id}>{t.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button
                    className={styles.filterBtn}
                    type="button"
                    onClick={handleSubmit}
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
});

export default Filter;
