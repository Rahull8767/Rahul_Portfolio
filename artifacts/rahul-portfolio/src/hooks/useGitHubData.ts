import { useState, useEffect } from "react";
import type { GithubRepo } from "../types";
import fallback from "../data/github-fallback.json";

interface GitHubData {
  repos: GithubRepo[];
  languages: { name: string; percentage: number }[];
  loading: boolean;
  error: boolean;
}

export function useGitHubData(username: string): GitHubData {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<{ name: string; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=4`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!response.ok) throw new Error("rate-limited");
        const data = await response.json();
        if (cancelled) return;

        const mapped: GithubRepo[] = (data as {
          name: string;
          description: string | null;
          language: string | null;
          stargazers_count: number;
          forks_count: number;
          html_url: string;
        }[]).slice(0, 4).map((r) => ({
          name: r.name,
          description: r.description ?? "",
          language: r.language ?? "—",
          stars: r.stargazers_count,
          forks: r.forks_count,
          url: r.html_url,
        }));

        setRepos(mapped);
        setLanguages(fallback.languages);
      } catch {
        if (!cancelled) {
          setRepos(fallback.repos);
          setLanguages(fallback.languages);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [username]);

  return { repos, languages, loading, error };
}
