import React, { useEffect, useState } from 'react';
import draftToHtml from 'draftjs-to-html';

function ProductDescriptionRender({ description, sort }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (description) {
      try {
        const rawContentState = JSON.parse(description);
        const htmlContent = draftToHtml(rawContentState);
        if (sort == 'true') {
          setHtmlContent(htmlContent).substring(0, 20);
        } else {
          setHtmlContent(htmlContent);
        }
      } catch (error) {
        console.error('Error parsing description JSON:', error);
      }
    }
  }, [description]);

  return description ? (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  ) : (
    <div />
  );
}

export default ProductDescriptionRender;
