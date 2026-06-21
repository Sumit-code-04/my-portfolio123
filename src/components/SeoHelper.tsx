import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SeoHelper: React.FC = () => {
  const { seoSettings } = useApp();

  useEffect(() => {
    if (seoSettings.websiteTitle) {
      document.title = seoSettings.websiteTitle;
    }

    // Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoSettings.metaDescription || '');

    // Set Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoSettings.keywords || '');
  }, [seoSettings]);

  return null;
};
