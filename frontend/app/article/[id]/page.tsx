import React from "react";
import Markdown from "markdown-to-jsx";

async function getArticle(articleId: string) {
  const res = await fetch(
    `http://localhost:1337/api/articles/${articleId}?populate=*`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);
  return (
    <div>
      <h1>{article.data.attributes.Title}</h1>
      <div>{JSON.stringify(article.data.attributes.tags)}</div>
      <div>{article.data.attributes.updatedAt}</div>
      <Markdown>{article.data.attributes.Content}</Markdown>
    </div>
  );
}
