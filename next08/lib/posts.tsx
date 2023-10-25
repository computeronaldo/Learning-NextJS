import { compileMDX } from "next-mdx-remote/rsc";

type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

type FilesInfo = {
  tree: [
    {
      path: string;
      sha: string;
    }
  ];
};

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const postsRes = await fetch(
    "https://api.github.com/repos/computeronaldo/TestBlogs/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-Github-Api-Version": "2022-11-28",
      },
    }
  );

  if (!postsRes.ok) return undefined;

  const repoFileInfo: FilesInfo = await postsRes.json();

  const filesInfo = repoFileInfo.tree.map((file) => {
    return {
      path: file.path,
      sha: file.sha,
    };
  });

  const fileShaCode = filesInfo.find(
    (fileInfo) => fileInfo.path === fileName
  )?.sha;

  if (!fileShaCode) return undefined;

  const res = await fetch(
    `https://api.github.com/repos/computeronaldo/TestBlogs/git/blobs/${fileShaCode}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const fileContent = await res.json();

  const rawMDX = atob(fileContent.content);

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  return blogPostObj;
}

export const getPostsMeta = async (): Promise<Meta[] | undefined> => {
  const res = await fetch(
    "https://api.github.com/repos/computeronaldo/TestBlogs/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-Github-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFileTree: FileTree = await res.json();

  const filesArray = repoFileTree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};
