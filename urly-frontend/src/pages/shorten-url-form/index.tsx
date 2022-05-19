import React from 'react';
import useFetch from 'use-http';
import { useLocation } from 'wouter';
import ShortenUrlFormBase from './shorten-url-form-base';

const backendUrl: string = 'http://localhost:5000';

function ShortenUrlForm() {
  const [, setLocation] = useLocation();
  const { post, response } = useFetch(backendUrl);
  async function handleSubmit(url: string) {
    const shortenedUrl = await post('/', { url });
    if (response.ok) {
      setLocation('/links/' + shortenedUrl);
    }
  }
  return <ShortenUrlFormBase onSubmit={handleSubmit} />;
}

export default ShortenUrlForm;
