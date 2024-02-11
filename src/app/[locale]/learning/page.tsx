'use client';

import '../../globals.scss'
import { useSearchParams } from 'next/navigation';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '@/components/Loader';

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
      setContent(content);
    }
  }

  return <div>    
    {!content && <Loader />}
    {content && (
      <MarkdownPreview source={content} />
    )}
    
  </div>;
}
