import Image from "next/image";
import styles from "./styles.module.css"
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";


async function getHome() {
	const res = await fetch(
		`${process.env.SERVER_ROUTE}api/home-page`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}


export default async function Home() {
  const homePage = await getHome();
  return (
  <div className={styles.container}>
    <MarkdownRenderer content={homePage.data.attributes.content} />
  </div>
  );
}
