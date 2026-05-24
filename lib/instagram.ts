type InstagramPost = {
  id: string;
  permalink: string;
  media_url?: string;
  caption?: string;
  timestamp?: string;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", "id,caption,media_url,permalink,timestamp");
  url.searchParams.set("limit", "6");
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 30 } });
    if (!response.ok) return [];
    const data = (await response.json()) as { data?: InstagramPost[] };
    return data.data ?? [];
  } catch {
    return [];
  }
}

