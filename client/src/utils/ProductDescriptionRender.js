import React, { useEffect, useState } from 'react';
import draftToHtml from 'draftjs-to-html';

function ProductDescriptionRender({ description }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (description) {
      try {
        const rawContentState = JSON.parse(description);
        const htmlContent = draftToHtml(rawContentState);
        setHtmlContent(htmlContent);
      } catch (error) {
        console.error('Error parsing description JSON:', error);
      }
    }
  }, [description]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default ProductDescriptionRender;
