'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, ArrowRight, Sparkles, X } from 'lucide-react';

const ITEMS_PER_PAGE = 16;
// Neemuch town — the map opens centred on the district itself, not all of MP.
const MAP_CENTER = [24.4772, 74.8712];
const MAP_ZOOM = 10;

export default function PanchayatListClient({ initialPanchayats = [] }) {
  const router = useRouter();
  const panchayats = initialPanchayats;

  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [mapContainerRef, setMapContainerRef] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedPanchayat, setSelectedPanchayat] = useState(null);
  const [hoveredPanchayat, setHoveredPanchayat] = useState(null);

  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const lastClickedMarkerRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const filteredPanchayats = useMemo(() => {
    if (!searchTerm) return panchayats;
    const searchLower = searchTerm.toLowerCase();
    return panchayats.filter((item) =>
      item.name?.toLowerCase().includes(searchLower) ||
      item.block?.toLowerCase().includes(searchLower)
    );
  }, [panchayats, searchTerm]);

  const displayedPanchayats = useMemo(() => {
    return filteredPanchayats.slice(0, displayCount);
  }, [filteredPanchayats, displayCount]);

  const hasMore = displayCount < filteredPanchayats.length;

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchTerm]);

  useEffect(() => {
    if (!hasMore) return;

    const options = { root: null, rootMargin: '200px', threshold: 0.1 };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredPanchayats.length));
      }
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, filteredPanchayats.length]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    if (mapRef.current) mapRef.current.setView(MAP_CENTER, MAP_ZOOM);
  }, []);

  const handleCardClick = useCallback((slug) => {
    router.push(`/panchayats/${slug}`);
  }, [router]);

  const formatPopulation = useCallback((pop) => {
    if (!pop) return 'N/A';
    if (pop > 1000) return `${(pop / 1000).toFixed(1)}K`;
    return pop.toString();
  }, []);

  const formatArea = useCallback((area) => {
    if (!area) return 'N/A';
    return `${area.toLocaleString()} km²`;
  }, []);

  const createMarkerPopup = useCallback((panchayat) => {
    return `
      <div style="text-align: center; padding: 10px; min-width: 180px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#117307" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span style="font-weight: 600; color: #117307; font-size: 13px;">
            ${panchayat.block || ''}, Neemuch
          </span>
        </div>
        <div style="font-weight: bold; color: #0d4d03; font-size: 18px; margin-bottom: 4px;">
          ${panchayat.name || 'Panchayat'}
        </div>
        ${panchayat.basicInfo?.population ? `<div style="color: #1a5e10; font-size: 12px; margin-top: 4px; font-weight: 500;">Population: ${formatPopulation(panchayat.basicInfo.population)}</div>` : ''}
        <button
          onclick="document.dispatchEvent(new CustomEvent('panchayatSelect', { detail: '${panchayat._id}' }))"
          style="margin-top: 10px; padding: 6px 16px; background: #117307; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s;"
          onmouseover="this.style.background='#0d5c06'"
          onmouseout="this.style.background='#117307'"
        >
          View Details
        </button>
      </div>
    `;
  }, [formatPopulation]);

  useEffect(() => {
    if (!mapContainerRef) return;

    const loadLeaflet = async () => {
      if (window.L) {
        initMap();
        return;
      }

      const link = document.createElement('link');
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.rel = 'stylesheet';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Failed to load Leaflet library');
        setMapLoading(false);
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (!window.L || !mapContainerRef || mapRef.current) return;

      try {
        const map = window.L.map(mapContainerRef).setView(MAP_CENTER, MAP_ZOOM);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        mapRef.current = map;

        setTimeout(() => {
          map.invalidateSize();
        }, 100);

        setMapLoading(false);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapLoading(false);
      }
    };

    const handlePanchayatSelect = (event) => {
      const panchayatId = event.detail;
      const panchayat = panchayats.find((p) => p._id === panchayatId);
      if (panchayat) setSelectedPanchayat(panchayat);
    };

    document.addEventListener('panchayatSelect', handlePanchayatSelect);
    loadLeaflet();

    return () => {
      document.removeEventListener('panchayatSelect', handlePanchayatSelect);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
      lastClickedMarkerRef.current = null;
    };
  }, [mapContainerRef, panchayats]);

  useEffect(() => {
    if (!mapRef.current || !window.L || mapLoading || filteredPanchayats.length === 0) return;

    const timer = setTimeout(() => {
      markersRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
      markersRef.current = [];

      const panchayatsToShow = filteredPanchayats.filter(
        (p) => p.coordinates?.lat && p.coordinates?.lng
      );

      const greenIcon = window.L.divIcon({
        html: `<img src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/location" style="width: 100%; height: 100%; object-fit: contain; display: block;" />`,
        className: '',
        iconSize: [36, 47],
        iconAnchor: [18, 47],
        popupAnchor: [1, -43],
      });

      panchayatsToShow.forEach((panchayat) => {
        const coords = [panchayat.coordinates.lat, panchayat.coordinates.lng];
        const marker = window.L.marker(coords, { icon: greenIcon }).addTo(mapRef.current);

        marker.bindTooltip(panchayat.name, {
          permanent: true,
          direction: 'bottom',
          className: 'panchayat-label-text',
          offset: [0, 5]
        });

        markersRef.current.push(marker);
        marker.panchayatData = panchayat;

        marker.on('click', () => {
          if (lastClickedMarkerRef.current === marker) {
            setSelectedPanchayat(panchayat);
          } else {
            mapRef.current.setView(coords, 13);
            lastClickedMarkerRef.current = marker;
          }
        });

        marker.bindPopup(createMarkerPopup(panchayat));
      });

      if (!document.getElementById('panchayat-label-styles')) {
        const style = document.createElement('style');
        style.id = 'panchayat-label-styles';
        style.textContent = `
          .leaflet-tooltip.panchayat-label-text {
            background: rgba(255, 255, 255, 0.85) !important;
            border: 2px solid #117307 !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
            padding: 2px 6px !important;
            margin: 0 !important;
            border-radius: 4px !important;
          }
          .leaflet-tooltip.panchayat-label-text::before {
            border-top-color: #117307 !important;
          }
          .panchayat-label-text {
            font-size: 11px !important;
            font-weight: 800 !important;
            color: #0d5c06 !important;
            white-space: nowrap !important;
          }
        `;
        document.head.appendChild(style);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredPanchayats, mapLoading, createMarkerPopup]);

  return (
    <div className="min-h-screen hideExtra bg-[#f5fbf2]">
      <div className="bg-[#117307] relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10 relative z-10">
          <div className="lg:hidden space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Home size={18} className="text-white" />
                <span className="text-sm font-semibold text-white">Village Stories</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Gram Panchayats
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Experience the heart of rural Neemuch — authentic villages, rich traditions, and vibrant communities
              </p>
            </div>

            <div className="bg-white max-w-3xl mx-auto rounded-2xl shadow-lg p-4 md:p-6 relative z-20">
              <div className="flex items-center gap-2 rounded-lg border border-[#117307]/30 bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307]">
                <Search size={20} className="shrink-0 text-[#117307]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search panchayats or blocks..."
                  className="w-full border-0 bg-transparent p-0 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-[#117307]/10 flex items-center justify-between text-sm">
                <span className="text-[#117307] font-medium">
                  {filteredPanchayats.length} {filteredPanchayats.length === 1 ? 'panchayat' : 'panchayats'}
                </span>
                <div className="flex items-center gap-2 text-[#117307]/60">
                  <Sparkles size={16} />
                  <span>Explore Villages</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-between items-start gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Home size={18} className="text-white" />
                <span className="text-sm font-semibold text-white">Village Stories</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                Gram Panchayats
              </h1>
              <p className="text-lg text-white/90">
                Experience the heart of rural Neemuch — authentic villages and traditions
              </p>
            </div>

            <div className="flex-1 max-w-lg">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 rounded-lg border border-[#117307]/30 bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307]">
                  <Search size={20} className="shrink-0 text-[#117307]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search panchayats..."
                    className="w-full border-0 bg-transparent p-0 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-[#117307]/10 flex items-center justify-between text-sm">
                  <span className="text-[#117307] font-medium">
                    {filteredPanchayats.length} {filteredPanchayats.length === 1 ? 'panchayat' : 'panchayats'}
                  </span>
                  <div className="flex items-center gap-2 text-[#117307] font-medium">
                    <Sparkles size={16} />
                    <span>Explore Villages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border-t-4 relative z-0 border-[#117307]">
          {mapLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#117307] mx-auto mb-4"></div>
                <p className="text-[#117307]">Loading map...</p>
              </div>
            </div>
          )}
          <div ref={setMapContainerRef} className="w-full h-96 md:h-[500px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredPanchayats.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#117307]/10 rounded-full mb-4">
              <Home size={32} className="text-[#117307]" />
            </div>
            <p className="text-[#117307] text-lg font-medium mb-2">
              {searchTerm ? 'No panchayats match your search' : 'Panchayats coming soon'}
            </p>
            {searchTerm && (
              <button
                onClick={handleClearFilters}
                className="text-[#117307] underline font-medium hover:text-[#0d5c06] transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedPanchayats.map((panchayat) => (
                <div
                  key={panchayat._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 transform hover:-translate-y-2 overflow-hidden group border-[#117307] relative"
                  onMouseEnter={() => setHoveredPanchayat(panchayat._id)}
                  onMouseLeave={() => setHoveredPanchayat(null)}
                  onClick={() => setSelectedPanchayat(panchayat)}
                >
                  <div className="h-48 overflow-hidden relative">
                    {panchayat.headerImage ? (
                      <img
                        src={panchayat.headerImage}
                        alt={panchayat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-[#f5fbf2]">
                        🏡
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{panchayat.name}</h3>
                        <p className="text-sm opacity-90">{panchayat.block}, Neemuch</p>
                      </div>
                    </div>

                    <div className={`absolute inset-0 bg-[#117307]/90 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredPanchayat === panchayat._id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center text-white p-4">
                        <p className="text-lg font-semibold mb-2">Explore {panchayat.name}</p>
                        <p className="text-sm opacity-90">Discover the authentic rural experience</p>
                        <div className="mt-3 inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                          Click to explore
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#117307] border-t-transparent"></div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedPanchayat && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPanchayat(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 relative overflow-hidden">
              {selectedPanchayat.headerImage ? (
                <img
                  src={selectedPanchayat.headerImage}
                  alt={selectedPanchayat.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl bg-[#117307]">
                  🏡
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedPanchayat(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X size={24} className="text-[#117307]" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-4xl font-bold mb-2">{selectedPanchayat.name}</h2>
                <p className="text-xl opacity-90">{selectedPanchayat.block}, Neemuch</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {selectedPanchayat.basicInfo?.establishmentYear && (
                  <div>
                    <p className="text-sm font-bold mb-2 text-[#117307]">ESTABLISHED</p>
                    <p className="text-lg font-semibold text-[#2E3A3B]">
                      {selectedPanchayat.basicInfo.establishmentYear}
                    </p>
                  </div>
                )}
                {selectedPanchayat.basicInfo?.population && (
                  <div>
                    <p className="text-sm font-bold mb-2 text-[#117307]">POPULATION</p>
                    <p className="text-lg font-semibold text-[#2E3A3B]">
                      {formatPopulation(selectedPanchayat.basicInfo.population)}
                    </p>
                  </div>
                )}
                {selectedPanchayat.basicInfo?.area && (
                  <div>
                    <p className="text-sm font-bold mb-2 text-[#117307]">AREA</p>
                    <p className="text-lg font-semibold text-[#2E3A3B]">
                      {formatArea(selectedPanchayat.basicInfo.area)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold mb-2 text-[#117307]">BLOCK</p>
                  <p className="text-lg font-semibold text-[#2E3A3B]">
                    {selectedPanchayat.block || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCardClick(selectedPanchayat.slug)}
                  className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg text-lg bg-[#117307] hover:bg-[#0d5c06]"
                >
                  Explore
                </button>
                <button
                  onClick={() => setSelectedPanchayat(null)}
                  className="flex-1 py-4 rounded-lg font-bold transition-all duration-300 hover:shadow-lg text-lg text-[#117307] border-2 border-[#117307] hover:bg-[#117307] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
