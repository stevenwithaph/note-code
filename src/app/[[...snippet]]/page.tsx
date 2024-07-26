import { redirect } from 'next/navigation';
import { Editor } from '../components/editor';
import { PrismaClient, Snippet } from '@prisma/client';

interface Params {
  params: { snippet: string[] };
}

async function getData(snippetId: string) {
  const prisma = new PrismaClient();
  const snippet = await prisma.snippet.findFirst({
    where: {
      id: snippetId,
    },
  });

  return snippet;
}

export default async function Page({ params }: Params) {
  let snippet: Snippet | null = null;
  if (params.snippet) {
    snippet = await getData(params.snippet[0]);

    if (!snippet) {
      redirect('/');
    }
  }

  const value = snippet?.snippet.toString() || '';
  const language = snippet?.language || 'html';

  return (
    <Editor
      value={value}
      defaultLanguage={language}
      readOnly={snippet !== null}
    />
  );
}
