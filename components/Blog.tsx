import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";


export default function Blog() {

    const posts = getSortedPostsData();

    return (
        <section className=" max-w-full p-5  leading-8  scroll-mt-28 flex flex-col bg-[#DEE4E7]  h-screen">
            <h1 className="text-3xl font-medium capitalize mb-8 text-left text-blue-700">My Blogs</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 ">
                {posts.map(posts => (
                    <ListItem posts={posts} key={posts.id} />
                ))}
            </ul>
        </section>
    )
}