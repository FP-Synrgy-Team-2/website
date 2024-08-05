import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Invoice } from '@/components';

function DownloadInvoice() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataLoaded && captureRef.current) {
      const { offsetWidth: width, offsetHeight: height } = captureRef.current;
      setDimensions({ width, height });
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (dataLoaded && dimensions && captureRef.current) {
      const element = captureRef.current;

      html2canvas(element, {
        width: dimensions.width,
        height: dimensions.height,
        scrollX: 0,
        scrollY: 0,
        useCORS: true, // This helps with cross-origin images
      })
        .then((canvas) => {
          const link = document.createElement('a');
          link.download = 'invoice.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          navigate(-1); // Navigate back after download
        })
        .catch((error) => {
          console.error('Error generating canvas:', error);
        });
    }
  }, [dataLoaded, dimensions, navigate]);

  return <Invoice ref={captureRef} onDataLoaded={() => setDataLoaded(true)} />;
}

export default DownloadInvoice;
