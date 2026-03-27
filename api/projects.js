export default async function handler(req, res) {
  // CORS Headers (just in case, though usually same-origin on Vercel)
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'Abdelrahman2411200';

  if (!token) {
    console.error('Missing GITHUB_TOKEN environment variable');
    return res.status(500).json({ error: 'GitHub synchronization is not configured.' });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': `${username}-Portfolio`
      }
    });

    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
    console.log(`GitHub API Rate Limit Remaining: ${rateLimitRemaining}`);

    if (!response.ok) {
      if (response.status === 403 && rateLimitRemaining === '0') {
        return res.status(503).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
      }
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const repos = await response.json();

    // Filter and map projects
    const portfolioProjects = repos
      .filter(repo => !repo.fork && repo.topics && repo.topics.includes('portfolio'))
      .map(repo => {
        // Strip out 'portfolio' and 'featured' from the visible tags
        const visibleTopics = repo.topics.filter(t => t !== 'portfolio' && t !== 'featured');
        const isFeatured = repo.topics.includes('featured');

        return {
          id: repo.id,
          name: repo.name,
          // Format name: "my-cool-project" -> "My Cool Project"
          displayName: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: repo.description,
          githubUrl: repo.html_url,
          liveUrl: repo.homepage,
          topics: visibleTopics,
          language: repo.language,
          stars: repo.stargazers_count,
          updatedAt: repo.pushed_at,
          createdAt: repo.created_at,
          isFeatured: isFeatured
        };
      });

    // Sort featured projects to the top
    portfolioProjects.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Cache-Control: Cache at Edge for 1 hour (3600s), serve stale while revalidating for 24 hours
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    
    return res.status(200).json(portfolioProjects);
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return res.status(500).json({ error: 'Failed to fetch projects from GitHub.' });
  }
}
