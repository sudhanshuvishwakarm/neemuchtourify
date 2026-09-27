'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin, Calendar, Mountain,
  Camera, ArrowLeft, Share2, Home, Building2,
  BookOpen, TreePine, UtensilsCrossed, Palette,
  Languages,
  Bus, Hotel, AlertCircle, Award, Landmark as PoliticalIcon,
  ArrowRight, Droplet
} from 'lucide-react';

// Plain content card matching the soft, rounded look used across the site.
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(20,82,12,0.05)] p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export default function PanchayatDetailPage({ panchayat: currentPanchayat }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('culture');

  if (!currentPanchayat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5fbf2] p-4">
        <Card>
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold mb-4 text-[#0d4d03]">Panchayat Not Found</h2>
          <p className="text-[#1a5e10] mb-6">The panchayat you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/panchayats')} className="bg-[#117307] text-white px-6 py-2 rounded-lg hover:bg-[#0d5c06] transition-colors">
            Back to Panchayats
          </button>
        </Card>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num > 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const tabs = [
    { id: 'culture', label: 'Culture', icon: BookOpen },
    { id: 'geography', label: 'Geography', icon: Mountain },
    { id: 'services', label: 'Services', icon: Building2 },
    { id: 'people', label: 'Notable People', icon: Award },
    { id: 'political', label: 'Political Overview', icon: PoliticalIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f5fbf2]">
      {/* Header */}
      <div className="bg-[#117307] py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center">
            <button onClick={() => router.push('/panchayats')} className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-lg">
              <ArrowLeft size={22} />
              Back to Panchayats
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: currentPanchayat.name,
                    text: `Explore ${currentPanchayat.name}`,
                    url: window.location.href
                  });
                }
              }}
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-lg"
            >
              <Share2 size={22} />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            {/* Hero Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6">
              <div className="relative bg-[#f5fbf2]">
                {currentPanchayat.headerImage ? (
                  <img
                    src={currentPanchayat.headerImage}
                    alt={currentPanchayat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                <div className={`absolute inset-0 items-center justify-center bg-[#117307] ${currentPanchayat.headerImage ? 'hidden' : 'flex'}`}>
                  <Home size={96} className="text-white opacity-50" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0d4d03] mb-2">
                {currentPanchayat.name}
              </h1>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-1 border-b-2 border-[#f5fbf2]">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-6 py-3 font-semibold transition-all text-base"
                    style={{
                      color: activeTab === tab.id ? '#117307' : '#1a5e10',
                      borderBottom: activeTab === tab.id ? '3px solid #117307' : 'none',
                      marginBottom: '-2px'
                    }}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'culture' && (
                <div className="space-y-4">
                  {currentPanchayat.culturalInfo?.historicalBackground && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <BookOpen size={20} className="text-[#117307]" />
                        Historical Background
                      </h2>
                      <p className="text-[#1a5e10] leading-relaxed whitespace-pre-line text-base">
                        {currentPanchayat.culturalInfo.historicalBackground}
                      </p>
                    </Card>
                  )}

                  {currentPanchayat.culturalInfo?.localArt && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <Palette size={20} className="text-[#117307]" />
                        Local Art & Crafts
                      </h2>
                      <p className="text-[#1a5e10] leading-relaxed whitespace-pre-line text-base">
                        {currentPanchayat.culturalInfo.localArt}
                      </p>
                    </Card>
                  )}

                  {currentPanchayat.culturalInfo?.localCuisine && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <UtensilsCrossed size={20} className="text-[#117307]" />
                        Local Cuisine
                      </h2>
                      <p className="text-[#1a5e10] leading-relaxed whitespace-pre-line text-base">
                        {currentPanchayat.culturalInfo.localCuisine}
                      </p>
                    </Card>
                  )}

                  {currentPanchayat.culturalInfo?.traditions && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <TreePine size={20} className="text-[#117307]" />
                        Traditions & Festivals
                      </h2>
                      <p className="text-[#1a5e10] leading-relaxed whitespace-pre-line text-base">
                        {currentPanchayat.culturalInfo.traditions}
                      </p>
                    </Card>
                  )}

                  {!currentPanchayat.culturalInfo?.historicalBackground &&
                   !currentPanchayat.culturalInfo?.localArt &&
                   !currentPanchayat.culturalInfo?.localCuisine &&
                   !currentPanchayat.culturalInfo?.traditions && (
                    <Card>
                      <BookOpen size={40} className="mx-auto text-[#117307] opacity-20 mb-3" />
                      <p className="text-[#1a5e10] text-base">Cultural information coming soon...</p>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'geography' && (
                <div className="space-y-4">
                  <Card>
                    <h2 className="text-xl font-bold text-[#0d4d03] mb-4">Key Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#f5fbf2] border border-green-100">
                        <h3 className="text-base font-semibold text-[#4d674f] mb-2">Population</h3>
                        <p className="text-2xl font-bold text-[#0d4d03]">
                          {formatNumber(currentPanchayat.basicInfo?.population)}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-[#f5fbf2] border border-green-100">
                        <h3 className="text-base font-semibold text-[#4d674f] mb-2">Area</h3>
                        <p className="text-2xl font-bold text-[#0d4d03]">
                          {currentPanchayat.basicInfo?.area ? `${currentPanchayat.basicInfo.area} km²` : 'N/A'}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-[#f5fbf2] border border-green-100">
                        <h3 className="text-base font-semibold text-[#4d674f] mb-2">Block</h3>
                        <p className="text-xl font-bold text-[#0d4d03]">{currentPanchayat.block || 'N/A'}</p>
                      </div>
                    </div>
                  </Card>

                  {currentPanchayat.coordinates?.lat != null && currentPanchayat.coordinates?.lng != null && (
                    <Card>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h2 className="text-xl font-bold text-[#0d4d03] flex items-center gap-2">
                          <MapPin size={20} className="text-[#117307]" />
                          Location
                        </h2>
                        <a
                          href={`https://www.google.com/maps?q=${currentPanchayat.coordinates.lat},${currentPanchayat.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#117307] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#0d5c06] transition-colors whitespace-nowrap"
                        >
                          Get Directions
                          <ArrowRight size={13} />
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="p-3 rounded-lg bg-[#f5fbf2]">
                          <p className="text-sm font-semibold text-[#4d674f] mb-1">Latitude</p>
                          <p className="text-lg font-bold text-[#0d4d03]">{currentPanchayat.coordinates.lat}°</p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#f5fbf2]">
                          <p className="text-sm font-semibold text-[#4d674f] mb-1">Longitude</p>
                          <p className="text-lg font-bold text-[#0d4d03]">{currentPanchayat.coordinates.lng}°</p>
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${currentPanchayat.coordinates.lat},${currentPanchayat.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-lg ring-1 ring-green-100"
                        title="Open location in Google Maps"
                      >
                        <iframe
                          title={`Map of ${currentPanchayat.name}`}
                          src={`https://www.google.com/maps?q=${currentPanchayat.coordinates.lat},${currentPanchayat.coordinates.lng}&z=12&output=embed`}
                          width="100%"
                          height="220"
                          style={{ border: 0, pointerEvents: 'none' }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </a>
                    </Card>
                  )}

                  {currentPanchayat.basicInfo?.majorRivers && currentPanchayat.basicInfo.majorRivers.length > 0 && (
                    <Card>
                      <div className="flex items-center gap-2 mb-3">
                        <Droplet size={20} className="text-[#117307]" />
                        <h3 className="text-lg font-bold text-[#0d4d03]">Major Rivers</h3>
                        <span className="text-base font-bold text-[#117307] ml-auto">
                          {currentPanchayat.basicInfo.majorRivers.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentPanchayat.basicInfo.majorRivers.map((river, idx) => (
                          <span key={idx} className="bg-[#117307]/10 text-[#117307] px-3 py-2 rounded-full text-base font-medium">
                            {river}
                          </span>
                        ))}
                      </div>
                    </Card>
                  )}

                  {currentPanchayat.basicInfo?.languagesSpoken && currentPanchayat.basicInfo.languagesSpoken.length > 0 && (
                    <Card>
                      <div className="flex items-center gap-2 mb-3">
                        <Languages size={20} className="text-[#117307]" />
                        <h3 className="text-lg font-bold text-[#0d4d03]">Languages Spoken</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentPanchayat.basicInfo.languagesSpoken.map((lang, idx) => (
                          <span key={idx} className="bg-[#117307]/10 text-[#117307] px-3 py-2 rounded-full text-base font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  <Card className="!bg-gradient-to-r from-[#117307] to-[#0d5c06] !border-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1">
                          Plan Your Visit
                        </h3>
                        <p className="text-white/90 text-sm">
                          Book directly, or reach out to our team for help planning your trip
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href="https://mptbooking.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-[#117307] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all shadow-lg whitespace-nowrap text-sm"
                        >
                          Book Now
                          <ArrowRight size={16} />
                        </a>
                        <a
                          href={`mailto:info@neemuchtourify.com?subject=${encodeURIComponent(`Trip Enquiry: ${currentPanchayat.name}`)}`}
                          className="inline-flex items-center gap-2 border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#117307] transition-all whitespace-nowrap text-sm"
                        >
                          Get Quote
                        </a>
                      </div>
                    </div>
                  </Card>
                  {currentPanchayat.transportationServices && currentPanchayat.transportationServices.length > 0 && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <Bus size={20} className="text-[#117307]" />
                        Transportation
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentPanchayat.transportationServices.map((item, i) => (
                          <div key={i} className="p-4 rounded-lg bg-[#f5fbf2] border border-green-100">
                            <p className="font-bold text-[#0d4d03] text-base mb-1">{item.name}</p>
                            <p className="text-[#4d674f] text-base">{item.type}</p>
                            <p className="text-[#1a5e10] text-base">{item.location}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {currentPanchayat.hospitalityServices && currentPanchayat.hospitalityServices.length > 0 && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <Hotel size={20} className="text-[#117307]" />
                        Hospitality
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentPanchayat.hospitalityServices.map((item, i) => (
                          <div key={i} className="p-4 rounded-lg bg-[#f5fbf2] border border-green-100">
                            <p className="font-bold text-[#0d4d03] text-base mb-1">{item.name}</p>
                            <p className="text-[#4d674f] text-base">{item.type}</p>
                            <p className="text-[#1a5e10] text-base">{item.location}</p>
                            {item.contact?.phone && (
                              <a
                                href={`tel:${item.contact.phone}`}
                                className="inline-flex items-center gap-1.5 text-[#117307] text-base font-semibold mt-1 hover:underline"
                              >
                                <span aria-hidden="true">📞</span>
                                {item.contact.phone}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {currentPanchayat.emergencyDirectory && currentPanchayat.emergencyDirectory.length > 0 && (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <AlertCircle size={20} className="text-[#117307]" />
                        Emergency Contacts
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentPanchayat.emergencyDirectory.map((item, i) => (
                          <div key={i} className="p-4 rounded-lg bg-red-50 border border-red-100 flex justify-between items-center">
                            <span className="font-medium text-[#0d4d03] text-base">{item.service}</span>
                            <a href={`tel:${item.contactNumber}`} className="text-red-600 font-bold text-base hover:underline">
                              {item.contactNumber}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {(!currentPanchayat.transportationServices || currentPanchayat.transportationServices.length === 0) &&
                   (!currentPanchayat.hospitalityServices || currentPanchayat.hospitalityServices.length === 0) &&
                   (!currentPanchayat.emergencyDirectory || currentPanchayat.emergencyDirectory.length === 0) && (
                    <Card>
                      <Building2 size={40} className="mx-auto text-[#117307] opacity-20 mb-3" />
                      <p className="text-[#1a5e10] text-base">Service information coming soon...</p>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'people' && (
                <div>
                  {currentPanchayat.specialPersons && currentPanchayat.specialPersons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentPanchayat.specialPersons.map((person, i) => (
                        <Card key={i}>
                          <div className="flex items-start gap-3">
                            <Award size={20} className="text-[#117307] flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-bold text-[#0d4d03] text-base mb-1">{person.name}</h3>
                              <p className="text-[#117307] text-base font-medium mb-2">{person.achievement}</p>
                              <p className="text-[#1a5e10] text-base">{person.description}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <Award size={40} className="mx-auto text-[#117307] opacity-20 mb-3" />
                      <p className="text-[#1a5e10] text-base">Notable people information coming soon...</p>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'political' && (
                <div className="space-y-4">
                  {currentPanchayat.politicalOverview && currentPanchayat.politicalOverview.length > 0 ? (
                    <Card>
                      <h2 className="text-xl font-bold text-[#0d4d03] mb-3 flex items-center gap-2">
                        <PoliticalIcon size={20} className="text-[#117307]" />
                        Political Overview
                      </h2>
                      <div className="space-y-3">
                        {currentPanchayat.politicalOverview.map((item, i) => (
                          <div key={i} className="border-l-4 border-[#117307] pl-3">
                            {item.name && (
                              <h3 className="font-bold text-[#0d4d03] text-base">{item.name}</h3>
                            )}
                            {item.designation && (
                              <p className="text-[#4d674f] text-sm font-medium mb-1">{item.designation}</p>
                            )}
                            {item.contactNumber && (
                              <a
                                href={`tel:${item.contactNumber}`}
                                className="inline-flex items-center gap-1.5 text-[#117307] text-base font-semibold hover:underline"
                              >
                                <span aria-hidden="true">📞</span>
                                {item.contactNumber}
                              </a>
                            )}
                            {item.heading && (
                              <h3 className="font-bold text-[#0d4d03] text-base mb-1">{item.heading}</h3>
                            )}
                            {item.description && (
                              <p className="text-[#1a5e10] text-base">{item.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card>
                      <PoliticalIcon size={40} className="mx-auto text-[#117307] opacity-20 mb-3" />
                      <p className="text-[#1a5e10] text-base">Political overview coming soon...</p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-4 sticky top-24 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <Card>
                <h3 className="text-lg font-bold text-[#0d4d03] mb-3">Location Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#1a5e10]" />
                    <p className="text-[#1a5e10] text-base">
                      {currentPanchayat.block}, Neemuch
                    </p>
                  </div>
                  {currentPanchayat.basicInfo?.establishmentYear && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#1a5e10]" />
                      <p className="text-[#1a5e10] text-base">
                        Est. {currentPanchayat.basicInfo.establishmentYear}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="!bg-gradient-to-br from-[#117307] to-[#0d5c06] !border-0">
                <div className="text-center">
                  <h3 className="text-base font-bold text-white mb-2">
                    Book Your Journey
                  </h3>
                  <p className="text-white/90 text-xs mb-3">
                    Complete travel solutions at your fingertips
                  </p>
                  <a
                    href="https://mptbooking.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#117307] px-4 py-2 rounded-lg font-bold hover:bg-white/90 transition-all shadow-lg w-full text-sm"
                  >
                    Explore Now
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={`mailto:info@neemuchtourify.com?subject=${encodeURIComponent(`Trip Enquiry: ${currentPanchayat.name}`)}`}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 border-2 border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-[#117307] transition-all text-sm"
                  >
                    Get a Free Quote
                  </a>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="flex justify-around text-white text-sm font-medium">
                      <span>✈️ Flights</span>
                      <span>🏨 Hotels</span>
                      <span>🚌 Bus</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
