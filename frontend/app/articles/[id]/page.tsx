import React from 'react';
import styles from './styles.module.css';
import ArticleContent from './ArticleContent';

async function getArticle(articleId: string) {
	const res = await fetch(
		`http://localhost:1337/api/articles/${articleId}?populate=*`,
		{ cache: 'no-store' }
	);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default async function ArticlePage({
	params,
}: {
	params: { id: string };
}) {
	const article = await getArticle(params.id);
	const getPublishedDate = () => {
		const publishedDate = new Date(article.data.attributes.publishedAt);
		return `${publishedDate.getDate()} ${
			monthNames[publishedDate.getMonth()]
		} ${publishedDate.getFullYear()}`;
	};
	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.title}>
					{article.data.attributes.title}
				</h1>
				<div className={styles.source}>
					<span>{article.data.attributes.author}</span>
					<span>|</span>
					<span>{getPublishedDate()}</span>
				</div>
				<div className={styles.content}>
					<ArticleContent content={article.data.attributes.content} />
				</div>
			</div>
		</div>
	);
}
