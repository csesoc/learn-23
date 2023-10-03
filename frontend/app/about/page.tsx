import React from 'react';
import styles from './styles.module.css';
import 'dotenv/config';
import AboutContent from './aboutContent';

async function getAboutPage() {
	const res = await fetch(
		`${process.env.SERVER_ROUTE}api/about-page`,
		{ cache: 'no-store' }
	);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export default async function AboutPage() {
	const aboutPage = await getAboutPage();
	return <div className={styles.page}>
		<div className={styles.container}>
			<h1 className={styles.title}>{aboutPage.data.attributes.title}</h1>
			<AboutContent content={aboutPage.data.attributes.content} />
		</div>
	</div>;
}
