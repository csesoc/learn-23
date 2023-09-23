import React from 'react';
import styles from './styles.module.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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

export default async function ArticlePage({
	params,
}: {
	params: { id: string };
}) {
	const article = await getArticle(params.id);
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
					{article.data.attributes.Title}
				</h1>
				<div className={styles.source}>
					<span>John Smith</span>
					<span>|</span>
					<span>{getPublishedDate()}</span>
				</div>
				<div className={styles.content}>
					<ArticleContent content={article.data.attributes.Content} />
				</div>
			</div>
		</div>
	);
}
