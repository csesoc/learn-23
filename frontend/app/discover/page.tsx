import { BlogCard } from '@/components/blog-card/BlogCard';
import React from 'react';
import styles from './styles.module.css';

export default function DiscoverPage() {
	return (
		<div className={styles.container}>
			<BlogCard
				readTime={7}
				author='John Smith'
				gradient='linear-gradient(0deg, #82cee5 0%, #e59881 100%)'
				blurb="This COMP1511 Cheatsheet should provide you with a quick overview of the 1511 course and its key concepts. This won't cover all the possible edgecases."
				title='Backend Project Tutorial 1 - Creating a simple Express.js backendbackend'
			/>
		</div>
	);
}
