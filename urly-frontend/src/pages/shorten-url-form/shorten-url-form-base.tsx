import React, { useState } from 'react';
import { Paper, IconButton, InputBase } from '@mui/material';
import { Send } from '@mui/icons-material';

export type ShortenUrlFormProps = {
  onSubmit: (value: string) => void;
};

function ShortenUrlFormBase({ onSubmit }: ShortenUrlFormProps) {
  const [url, setUrl] = useState('');
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(url);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      noValidate
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Shorten URL"
        inputProps={{ 'aria-label': 'shorten url' }}
        required
        autoFocus
        value={url}
        onChange={handleUrlChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="submit">
        <Send />
      </IconButton>
    </Paper>
  );
}

export default ShortenUrlFormBase;
