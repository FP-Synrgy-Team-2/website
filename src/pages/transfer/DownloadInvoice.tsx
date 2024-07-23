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
    console.log('dataLoaded:', dataLoaded);
    if (dataLoaded && captureRef.current) {
      const { offsetWidth: width, offsetHeight: height } = captureRef.current;
      setDimensions({ width, height });
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (dataLoaded && dimensions) {
      const element = captureRef.current;
      if (element) {
        html2canvas(element, {
          width: dimensions.width,
          height: dimensions.height,
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'invoice.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          // Navigate back after download
          navigate(-1);
        });
      }
    }
  }, [dataLoaded, dimensions, navigate]);
  return <Invoice ref={captureRef} onDataLoaded={() => setDataLoaded(true)} />;
}

export default DownloadInvoice;
