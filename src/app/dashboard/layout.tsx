import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return &lt;div className="container py-8 md:py-12"&gt;{children}&lt;/div&gt;;
}
