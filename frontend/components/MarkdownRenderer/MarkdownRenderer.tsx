'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SocialsButton from '../SocialsButton/SocialsButton';
import rehypeRaw from 'rehype-raw';
import SiteButton from '../SiteButton/SiteButton';

export default function MarkdownRenderer({ content }: { content: string }) {
	return (
		//@ts-expect-error
		<ReactMarkdown rehypePlugins={[rehypeRaw]}
			components={{
				//@ts-expect-error
				socialsbutton: SocialsButton,
				sitebutton:	SiteButton,
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
