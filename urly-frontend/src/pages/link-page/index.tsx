import React, { useState } from 'react';
import useFetch from 'use-http';
import { Link, Stack, IconButton, Tooltip, Typography, CircularProgress } from '@mui/material';
import { CopyAll } from '@mui/icons-material';

export type LinkPageProps = {
  params: { shortUrl: string };
};

const backendUrl = 'http://localhost:5000';

function LinkPage({ params }: LinkPageProps) {
  const fullLinkUrl = backendUrl + '/' + params.shortUrl;

  const [buttonClicked, setButtonClicked] = useState(false);
  const tooltipText = buttonClicked ? "Copied to clipboard!" : "Copy to clipboard";
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipClose = () => {
    setTooltipOpen(false);
    setButtonClicked(false);
  };
  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(fullLinkUrl);
    setButtonClicked(true);
    setTooltipOpen(true);
  };

  const { data } = useFetch(fullLinkUrl + '/clicks', {}, []);

  return (
    <Stack direction="column">
      {(data?.clicks == null) ?
        <CircularProgress /> :
        <Typography variant="h2">{data.clicks} clicks</Typography>
      }
      <Stack direction="row">
        <Link
          sx={{ fontSize: "2rem" }}
          href={fullLinkUrl}
        >
          {fullLinkUrl}
        </Link>
        <Tooltip
          title={tooltipText}
          open={tooltipOpen}
          onClose={handleTooltipClose}
          onOpen={handleTooltipOpen}
          leaveDelay={500}
        >
          <IconButton
            sx={{ p: '10px' }}
            onClick={handleCopyClick}
          >
            <CopyAll />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default LinkPage;
