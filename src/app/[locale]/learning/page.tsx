'use client';

import '../../globals.scss'
import { useSearchParams } from 'next/navigation';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '@/components/Loader';
import { Center } from '@/components/Center';

async function getData(id: string, language: string) {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  })
  const res = await client.get('/lesson-content', {
    params: {
      id,
      language
    }
  })
  
  return res.data
}

export default function Page() {
  const [content, setContent] = useState(``);
  const params = useSearchParams();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const id = params.get('id');
    const language = params.get('language');
    if (id && language) {
      const content = await getData(id, language);
      setContent(removeMarkdownTags(content));
    }
  }

  function removeMarkdownTags(str: string) {
    const startTag = '```markdown';
    const endTag = '```';
    if (str.startsWith(startTag) && str.endsWith(endTag)) {
      str = str.slice(startTag.length);
      str = str.slice(0, -endTag.length);
    }
    return str.trim();
  }

  return <div>    
    {!content && (
      <Center>
        <Loader />
      </Center>
    )}
    {content && (
      <MarkdownPreview source={content} />
    )}
    
  </div>;
}
