import React from 'react';
import styles from './styles.module.css';

import 'dotenv/config'
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

async function getFooter() {
	const res = await fetch(
		`${process.env.SERVER_ROUTE}api/footer`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export default async function Footer() {
    const footer = await getFooter();
    return <footer className={styles.footer}><MarkdownRenderer content={footer.data.attributes.content} /></footer>;
    // return <footer className={styles.footer}><p>MIT Licensed • Made with ❤ by CSESoc Education</p><p>2023, Sydney</p></footer>
}