import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  const json = await request.json();
  const language = json.language;
  const snippet = json.snippet;

  if (!language || !snippet) {
    return;
  }

  const buffer = Buffer.from(snippet.valueOf() as string);

  const note = await prisma.snippet.create({
    data: {
      language: language.valueOf() as string,
      snippet: buffer,
    },
  });

  return Response.json({
    id: note.id,
  });
}
