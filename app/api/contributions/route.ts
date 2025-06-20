import { NextRequest } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const USERNAME = 'Leschaevej';

type ContributionData = number[][];

export async function GET(req: NextRequest) {
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
    });

    const json = await response.json();

    if (json.errors) {
      return new Response(JSON.stringify({ error: 'Erreur API GitHub' }), { status: 500 });
    }

    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;

    const data: ContributionData = weeks.map((week: any) =>
      week.contributionDays.map((day: any) => day.contributionCount)
    );

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur interne serveur' }), { status: 500 });
  }
}