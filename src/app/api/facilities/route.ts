import { type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { facilities } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const type = searchParams.get('facilityType');

  const filters = [];
  if (city) filters.push(eq(facilities.city, city));
  if (type) filters.push(eq(facilities.facilityType, type));

  const data = await db
    .select()
    .from(facilities)
    .where(filters.length > 0 ? and(...filters) : undefined);
    // problem z serializacją biginta
//   return new Response(JSON.stringify(data, (_key, value) =>
//     typeof value === "bigint" ? value.toString() : value
// ), {
//   headers: { "Content-Type": "application/json" },
// });
  return NextResponse.json(data, {
  status: 200,
  // Replacer musi zwracać unknown, aby uciszyć lintera
  headers: {
    "Content-Type": "application/json",
  },
});
}
