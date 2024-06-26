import { createBlog, getAllBlogs, getMyBlogs, getOneBlog } from '@/service/apiBlogs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const useBlogs = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAllBlogs,
		retry: false,
	});
	const blogs = data?.blogs || [];
	return { isLoading, blogs };
};

export const useBlog = (id: string) => {
	const { id: blogId } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ['blog', blogId],
		queryFn: () => getOneBlog(id),
	});
	const blog = data?.blog;
	return { isLoading, blog };
};

export const useCreateBlog = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ['createBlog'],
		mutationFn: ({ title, content }: { title: string; content: string }) =>
			createBlog({ title, content }),
		onSuccess: (data) => {
			toast.success('Blog posted');
			queryClient.invalidateQueries({
				queryKey: ['blogs'],
			});
			navigate(`/blog/${data.blog.id}`);
		},
		onError: (error) => {
			toast.error('Something went wrong, try again later...');
			console.log(error);
		},
	});
	return { mutate, isPending };
};

export const useMyBlogs = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['myBlogs'],
		queryFn: getMyBlogs,
		retry: false,
	});
	const blogs = data?.blogs || [];
	return { isLoading, blogs };
};
