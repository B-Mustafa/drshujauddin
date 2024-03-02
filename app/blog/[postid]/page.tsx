import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Head from 'next/head'; 

export default async function Blog({ params }: { params: { postid: string } }) {
    const posts = getSortedPostsData();
    const { postid } = params;

    if (!posts.find(post => post.id === postid)) {
        return notFound();
    }

    const { title, date, contentHtml } = await getPostData(postid);

    const pubDate = getFormattedDate(date);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Published on ${pubDate}`} />
            </Head>
            <main className="p-6 bg-dark-background  text-white h-screen overflow-auto content">
                <h1 className="text-white text-3xl font-bold mb-4">{title}</h1>
                <p className="text-white  mb-6">{pubDate}</p>
                <article className="prose text-dark-text" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p className="mt-8">
                    <Link href="/blog" className="flex items-center text-blue-500 hover:underline bottom-0 relative mb-2 mt-3">
                        <ArrowLeft className="mr-2" />
                        Back to home
                    </Link>
                </p>
            </main>
        </>
    );
}
