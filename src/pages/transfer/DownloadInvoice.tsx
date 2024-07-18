import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Invoice } from '@/components';

function DownloadInvoice() {
  const captureRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const captureAndDownload = async () => {
      const element = captureRef.current;
      if (element) {
        try {
          // Await the canvas rendering
          const canvas = await html2canvas(element, {
            width: 1366,
            height: 768,
          });

          // Create a download link
          const link = document.createElement('a');
          link.download = 'invoice.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        } catch (error) {
          console.error('Error while downloading invoice:', error);
        }
      }
    };

    captureAndDownload();
  }, [navigate]);

  return <Invoice ref={captureRef} />;
}

export default DownloadInvoice;
