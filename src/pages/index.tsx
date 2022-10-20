import { FC } from 'react';
import { LoaderFunction, RouteObject, useLoaderData } from 'react-router-dom';
import appwrite from '@lib/appwrite';
import PostCard from '@components/PostCard';
import getUser from '@lib/util/getUser';

const loader: LoaderFunction = async () => {
	return Promise.all(
		(await appwrite.db.listDocuments('instantgram', 'posts')).documents.map(
			async post => {
				const author = await getUser(post.userId);
				return { ...post, author: author ?? null };
			}
		)
	);
};

const Index: FC = () => {
	const posts = useLoaderData() as any;

	console.log(posts);

	return (
		<div className="mx-4 my-4 md:my-6 lg:mx-6 lg:my-10">
			<div className="mt-4 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
				{posts?.map((post: any) => (
					<PostCard post={post} key={post.$id} />
				))}
			</div>
		</div>
	);
};

const route: RouteObject = {
	index: true,
	element: <Index />,
	loader
};

export default route;
