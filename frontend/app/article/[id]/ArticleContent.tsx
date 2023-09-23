'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ArticleContent({ content }: { content: string }) {
	return (
		<ReactMarkdown
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter
							{...props}
							style={materialDark}
							language={match[1]}
							PreTag='div'
						>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code {...props} className={className}>
							{children}
						</code>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
