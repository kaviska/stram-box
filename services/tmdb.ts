export const TMDB_API_KEY = 'd856289c2e5dcd561056a1824e80d8fb';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type: 'movie' | 'tv';
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export const fetchTrending = async (type: 'movie' | 'tv' = 'movie'): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/${type}/week?api_key=${TMDB_API_KEY}`
        );
        const data: TMDBResponse<MediaItem> = await response.json();
        return data.results.map(item => ({ ...item, media_type: type }));
    } catch (error) {
        console.error('Error fetching trending data:', error);
        return [];
    }
};

export const searchMedia = async (query: string): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data: TMDBResponse<MediaItem> = await response.json();
        return data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
    } catch (error) {
        console.error('Error searching media:', error);
        return [];
    }
};
export interface MediaDetails extends MediaItem {
    genres: { id: number; name: string }[];
    runtime?: number;
    status?: string;
    tagline?: string;
    episode_run_time?: number[];
    number_of_seasons?: number;
}

export const fetchMediaDetails = async (id: number, type: 'movie' | 'tv'): Promise<MediaDetails | null> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        return { ...data, media_type: type };
    } catch (error) {
        console.error('Error fetching media details:', error);
        return null;
    }
};
