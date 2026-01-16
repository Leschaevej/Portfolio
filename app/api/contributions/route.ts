const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = 'Leschaevej';

export const revalidate = 3600;
type ContributionData = number[][];
interface GitHubDay {
    contributionCount: number;
}
interface GitHubWeek {
    contributionDays: GitHubDay[];
}
export async function GET() {
    if (!GITHUB_TOKEN) {
        return new Response(
            JSON.stringify({ error: 'Token GitHub non configuré' }),
            { status: 500 }
        );
    }
    const query = `
    {
        user(login: "${USERNAME}") {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            contributionCount
                        }
                    }
                }
            }
        }
    }`;
    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 },
        });
        if (!response.ok) {
            throw new Error(`GitHub API status: ${response.status}`);
        }
        const json = await response.json();
        if (json.errors) {
            console.error('Erreur GraphQL GitHub:', json.errors);
            return new Response(
                JSON.stringify({ error: 'Erreur API GitHub', details: json.errors }),
                { status: 500 }
            );
        }
        if (!json.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
            return new Response(
                JSON.stringify({ error: 'Format de réponse invalide' }),
                { status: 500 }
            );
        }
        const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
        const data: ContributionData = weeks.map((week: GitHubWeek) =>
            week.contributionDays.map((day: GitHubDay) => day.contributionCount)
        );
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch (error) {
        console.error('Erreur fetch GitHub contributions:', error);
        return new Response(
            JSON.stringify({ error: 'Erreur interne serveur' }),
            { status: 500 }
        );
    }
}