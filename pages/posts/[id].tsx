import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPostData, getAllPostIds, getPostData } from '../../lib/fetch'
import { GetStaticProps, GetStaticPaths } from 'next'
import { FC } from 'react'
import { POST } from '../../types/types'

const PostDetail: FC<POST> = ({
  title,
  content,
  username,
  tags,
  created_at,
}) => {
  return (
    <Layout title={title}>
      <div>
        {tags &&
          tags.map((tag, i) => (
            // TODO 三項演算子の部分を見やすくする(関数化 or swtich文)
            <span
              key={tag.id}
              className={`px-2 py-2 m-1 text-white rounded ${
                i === 0
                  ? 'bg-blue-500'
                  : i === 1
                  ? 'bg-gray-400'
                  : i === 2
                  ? 'bg-green-500'
                  : i === 3
                  ? 'bg-yellow-500'
                  : i === 4
                  ? 'bg-indigo-500'
                  : 'bg-gray-400'
              }`}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <p className="m-10 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{content}</p>
      <p>{created_at}</p>
      <p className="mt-3">by {username}</p>
      <Link href="/" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <a data-testid="back-blog"> Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string)

  return {
    props: {
      ...post,
    },
    revalidate: 3,
  }
}
