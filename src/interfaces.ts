export interface ISearchedContext {
  result: GitHubUser[] | null;
  setResult: React.Dispatch<React.SetStateAction<GitHubUser[] | null>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISearchProvider {
  children: React.ReactNode;
}

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export interface IUserCardProps {
  user: GitHubUser;
}

export interface IReturnedSearchCall {
  total_count: number;
  incomplete_results: number;
  items: GitHubUser[];
}
