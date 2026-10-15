/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InquiryHighlightBanner } from './components/InquiryHighlightBanner';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsCatalog } from './components/MaterialsCatalog';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { InquiryForm } from './components/InquiryForm';
import { WorkshopLocationSection } from './components/WorkshopLocationSection';
import { Footer } from './components/Footer';
import { InquiriesDashboardModal } from './components/InquiriesDashboardModal';
import { ProjectInquiry, MaterialItem } from './types';

const INITIAL_INQUIRY: ProjectInquiry = {
  id: 'FT-2026-001',
  name: 'FAHIM TRADERS',
  email: 'fahimkhan234568@gmail.com',
  phone: '03000127565',
  service: 'STRUCTURAL WELDING',
  scope: 'Home Main Gates & Solar Structures Fabrication (Bin Qasim, Karachi)',
  preferredContact: 'Phone',
  details: 'we have all iron and steel materials which are use to make home like main gate, solar structure etc',
  timestamp: new Date().toISOString(),
  status: 'New',
  notes: 'Priority inquiry from prompt. Complete iron and steel materials ready at Nasirabad Mor, near Ataullah Grass, Bin Qasim, Karachi.'
};

export default function App() {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('fahim_traders_inquiries');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Ignore JSON error
    }
    return [INITIAL_INQUIRY];
  });

  const [isInquiriesModalOpen, setIsInquiriesModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fahim_traders_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      // Storage quota or disabled
    }
  }, [inquiries]);

  const handleAddInquiry = (newInq: Omit<ProjectInquiry, 'id' | 'timestamp' | 'status'>) => {
    const created: ProjectInquiry = {
      ...newInq,
      id: `FT-2026-${String(inquiries.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    setInquiries((prev) => [created, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: ProjectInquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickInquireMaterial = (item: MaterialItem) => {
    const text = encodeURIComponent(
      `*FAHIM TRADERS INQUIRY*\n` +
      `Hello! I need a price quote and stock confirmation for: *${item.name}* (${item.gaugeOrSize}).\n` +
      `Standard length: ${item.standardLength}.\n` +
      `Stock rate: PKR ${item.ratePKR} ${item.rateUnit}.`
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        onOpenInquiriesModal={() => setIsInquiriesModalOpen(true)}
        inquiryCount={inquiries.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToInquiry={() => scrollToSection('contact')}
        />

        {/* Active Project Inquiry Spotlight */}
        <InquiryHighlightBanner
          inquiry={inquiries[0] || INITIAL_INQUIRY}
          onOpenInquiriesModal={() => setIsInquiriesModalOpen(true)}
        />

        {/* Core Services */}
        <ServicesSection />

        {/* Iron & Steel Materials Supply Catalog */}
        <MaterialsCatalog
          onQuickInquireMaterial={handleQuickInquireMaterial}
        />

        {/* Delivered Projects Showcase */}
        <ShowcaseGallery />

        {/* Workshop & Depot Physical Location in Karachi */}
        <WorkshopLocationSection />

        {/* Contact & Inquiries Form */}
        <InquiryForm
          onSubmitInquiry={handleAddInquiry}
        />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenInquiriesModal={() => setIsInquiriesModalOpen(true)}
      />

      {/* Orders & Inquiries Management Desk Modal */}
      <InquiriesDashboardModal
        isOpen={isInquiriesModalOpen}
        onClose={() => setIsInquiriesModalOpen(false)}
        inquiries={inquiries}
        onUpdateStatus={handleUpdateStatus}
        onDeleteInquiry={handleDeleteInquiry}
      />
    </div>
  );
}
