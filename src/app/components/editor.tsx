'use client';

import { FormEvent, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { editor } from 'monaco-editor';
import { useRouter } from 'next/navigation';
import { Select } from './select';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { ThemeSelect } from './theme-select';
import { Button } from './button';

interface Props {
  value: string;
  language: string;
  readOnly: boolean;
}

export function Editor(props: Props) {
  const [language, setLanguage] = useState(props.language);
  const { theme } = useTheme();
  const router = useRouter();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        language: language,
        snippet: editorRef.current?.getValue(),
      }),
    });

    router.push((await response.json()).id);
  }

  return (
    <div className="max-w-[1536px] h-dvh m-auto bg-light dark:bg-dark py-6 rounded-xl flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 h-full">
          <MonacoEditor
            height="100%"
            theme={theme === 'light' ? 'light' : 'vs-dark'}
            defaultValue={props.value}
            language={language}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              readOnly: props.readOnly,
              domReadOnly: props.readOnly,
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between px-6 py-1">
        <div className="space-x-4">
          <ThemeSelect />
          <Select
            disabled={props.readOnly}
            value={language}
            onChange={setLanguage}
          >
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="plaintext">Plain Text</option>
          </Select>
        </div>
        {!props.readOnly && (
          <form onSubmit={handleCreate}>
            <Button>Create</Button>
          </form>
        )}
        {props.readOnly && (
          <Link className="btn" href="/">
            New
          </Link>
        )}
      </div>
    </div>
  );
}
