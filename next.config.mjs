/** @type {import('next').NextConfig} */
const repo = 'cyber_terminal_devops_portfolio';
const isGithubActions = !!process.env.GITHUB_ACTIONS;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repo}` : '');

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
  },
};

export default nextConfig;
