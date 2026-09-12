import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { leadService } from '../services/leadService';
import { mediaService } from '../services/mediaService';
import { authService } from '../services/authService';
import { MediaAssetsManager } from '../components/dashboard/MediaAssetsManager';
import { CmsPageEditor } from '../components/dashboard/CmsPageEditor';
import { Lead, LeadScore } from '../types';
import {
  Shield,
  Users,
  Image as ImageIcon,
  Sliders,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Database,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  Unlock,
  LogOut,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [newPasswordVal, setNewPasswordVal] = useState<string>('');
  const [changePassSuccess, setChangePassSuccess] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'cms' | 'leads' | 'media' | 'telemetry'>('cms');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');
  const [imagesCount, setImagesCount] = useState<number>(0);
  const [videosCount, setVideosCount] = useState<number>(0);

  useEffect(() => {
    // Load persisted leads from lead service
    const storedLeads = leadService.getLeads();
    setLeads(storedLeads);
    if (storedLeads.length > 0) {
      setSelectedLead(storedLeads[0]);
    }

    // Track dynamic media counts from mediaService
    const updateMediaCount = () => {
      setImagesCount(mediaService.getImages().length);
      setVideosCount(mediaService.getVideos().length);
    };
    updateMediaCount();
    const unsubMedia = mediaService.subscribe(updateMediaCount);
    return () => unsubMedia();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (authService.login(passwordInput.trim())) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setAuthError('Contraseña incorrecta. Ingrese la clave autorizada (Ej: Xiochil0105).');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordVal.trim() || newPasswordVal.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    authService.changePassword(newPasswordVal.trim());
    setChangePassSuccess('Contraseña actualizada con éxito');
    setNewPasswordVal('');
    setTimeout(() => {
      setChangePassSuccess(null);
      setShowChangePassword(false);
    }, 2500);
  };

  // If not authenticated, show modern CRM login screen
  if (!isAuthenticated) {
    return (
      <div className="pt-24 sm:pt-28 min-h-screen bg-[#07080a] text-[#f5f2eb] flex items-center justify-center px-4 py-12">
        <SEOHead
          title="Acceso Restringido CRM | Aley Way Construction"
          description="Portal de autenticación para directores de Aley Way Construction LLC."
          noIndex={true}
        />

        <div className="w-full max-w-md bg-[#111216] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 bg-black/50 border border-[#c5a880]/30 rounded-full text-[#c5a880] mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[#c5a880] font-mono">
              Aley Way Construction &bull; Portal CRM
            </div>
            <h1 className="font-serif text-2xl text-[#f5f2eb]">
              Acceso a Administración
            </h1>
            <p className="text-xs text-[#8e9099] max-w-xs mx-auto">
              Ingrese la contraseña de seguridad para acceder a la gestión de páginas, edición de fotos/videos y prospectos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase tracking-wider block">
                Contraseña de Seguridad
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingrese contraseña..."
                  autoFocus
                  className="w-full bg-black/60 border border-white/15 p-3.5 pr-11 text-sm text-[#f5f2eb] placeholder-[#555760] focus:border-[#c5a880] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e9099] hover:text-white cursor-pointer"
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#c5a880] hover:bg-[#b0936b] text-[#0e0f12] font-medium text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
            >
              Ingresar al CRM
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-[#6e7078]">
              Contraseña predeterminada: <span className="font-mono text-[#c5a880] select-all">Xiochil0105</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = (leadId: string, newStatus: any) => {
    const updated = leadService.updateLeadStatus(leadId, newStatus);
    if (updated) {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead?.id === leadId) {
        setSelectedLead(updated);
      }
    }
  };

  const handleAddNote = (leadId: string) => {
    if (!newNote.trim()) return;
    const updated = leadService.addNote(leadId, newNote.trim());
    if (updated) {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead?.id === leadId) {
        setSelectedLead(updated);
      }
      setNewNote('');
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter !== 'ALL' && l.status !== leadStatusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        l.fullName.toLowerCase().includes(term) ||
        l.email.toLowerCase().includes(term) ||
        l.location.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const getScoreBadge = (score: LeadScore) => {
    switch (score) {
      case 'HOT':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'QUALIFIED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'NURTURE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-[#07080a] text-[#f5f2eb]">
      <SEOHead
        title="Principal Operations &amp; Lead Management | Aley Way Construction"
        description="Internal principal operations dashboard for Aley Way Construction LLC: lead qualification, media asset curation, and live site management."
        noIndex={true}
      />

      {/* Top Banner */}
      <div className="bg-[#111216] border-b border-white/10 px-6 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#c5a880] mb-1">
              <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Aley Way Operations Console &bull; Principal Access</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#f5f2eb]">
              Lead Inquiries &amp; Builder Operations
            </h1>
          </div>

          {/* Top Tabs & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 p-1 border border-white/10">
              {[
                { id: 'cms', label: 'Gestión de Páginas (CMS)', icon: Sliders },
                { id: 'leads', label: 'Prospectos (CRM)', icon: Users, count: leads.length },
                { id: 'media', label: 'Media Assets', icon: ImageIcon, count: imagesCount + videosCount },
                { id: 'telemetry', label: 'Métricas', icon: TrendingUp },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#c5a880] text-[#0e0f12] font-medium'
                        : 'text-[#8e9099] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          activeTab === tab.id
                            ? 'bg-black/20 text-[#0e0f12]'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Change Password & Logout */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="p-2 text-xs text-[#8e9099] hover:text-[#c5a880] border border-white/10 bg-black/30 hover:border-white/30 cursor-pointer"
                title="Cambiar Contraseña Maestra"
              >
                <KeyRound className="w-4 h-4" />
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-2 text-xs text-red-400 hover:text-red-300 border border-white/10 bg-black/30 hover:border-red-500/40 flex items-center space-x-1.5 cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Bar */}
        {showChangePassword && (
          <div className="max-w-7xl mx-auto mt-4 p-4 bg-black/70 border border-white/15">
            <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs text-[#c5a880] uppercase tracking-wider font-mono shrink-0">
                Cambiar Contraseña:
              </span>
              <input
                type="text"
                value={newPasswordVal}
                onChange={(e) => setNewPasswordVal(e.target.value)}
                placeholder="Nueva clave..."
                className="bg-[#111216] border border-white/20 p-2 text-xs text-[#f5f2eb] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase cursor-pointer"
              >
                Guardar Nueva Clave
              </button>
              <button
                type="button"
                onClick={() => setShowChangePassword(false)}
                className="px-3 py-2 text-xs text-[#8e9099] hover:text-white"
              >
                Cancelar
              </button>
            </form>
            {changePassSuccess && (
              <p className="text-xs text-emerald-400 mt-2 font-mono">{changePassSuccess}</p>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* CMS TAB */}
        {activeTab === 'cms' && <CmsPageEditor />}
        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Lead List Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex items-center space-x-3">
                <div className="relative flex-grow">
                  <Search className="w-3.5 h-3.5 text-[#6e7078] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by client or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#111216] border border-white/10 pl-9 pr-3 py-2 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="bg-[#111216] border border-white/10 px-3 py-2 text-xs text-[#8e9099] focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
                  <option value="PROPOSAL_SENT">Proposal Sent</option>
                  <option value="WON">Won</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                {filteredLeads.map((lead) => {
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 bg-[#111216] border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#16171d]'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-serif text-base text-[#f5f2eb]">
                          {lead.fullName}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border font-semibold ${getScoreBadge(
                            lead.score
                          )}`}
                        >
                          {lead.score}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-[#8e9099] mb-2">
                        <MapPin className="w-3 h-3 text-[#c5a880]" />
                        <span>{lead.location}</span>
                        <span>&bull;</span>
                        <span>{lead.investmentRange}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#6e7078] pt-2 border-t border-white/5">
                        <span>{lead.status.replace('_', ' ')}</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })}

                {filteredLeads.length === 0 && (
                  <div className="p-8 text-center bg-[#111216] border border-white/5 text-[#8e9099] text-xs">
                    No lead inquiries match your filter criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Right Lead Detail Column */}
            <div className="lg:col-span-7">
              {selectedLead ? (
                <div className="p-6 sm:p-8 bg-[#111216] border border-white/10 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb]">
                          {selectedLead.fullName}
                        </h2>
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 border font-semibold ${getScoreBadge(
                            selectedLead.score
                          )}`}
                        >
                          {selectedLead.score} Lead
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#6e7078]">
                        Ref: {selectedLead.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Status Select */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#8e9099] uppercase tracking-wider">Status:</span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                        className="bg-[#07080a] border border-white/20 text-xs px-3 py-1.5 text-[#c5a880] focus:outline-none"
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                        <option value="WON">Won</option>
                        <option value="LOST">Lost</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Parameters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-black/40 border border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Build Location
                      </span>
                      <span className="font-medium text-[#f5f2eb]">{selectedLead.location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Land Status
                      </span>
                      <span className="font-medium text-[#f5f2eb]">
                        {selectedLead.ownsLand.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Target Investment
                      </span>
                      <span className="font-medium text-[#f5f2eb]">{selectedLead.investmentRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Timeline
                      </span>
                      <span className="font-medium text-[#f5f2eb]">
                        {selectedLead.timeline.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Project Scope
                      </span>
                      <span className="font-medium text-[#f5f2eb]">
                        {selectedLead.projectType.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        Preferred Contact
                      </span>
                      <span className="font-medium text-[#c5a880]">
                        {selectedLead.preferredContact.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="p-3 bg-white/5 border border-white/10 flex items-center space-x-3 text-xs text-[#f5f2eb] hover:border-[#c5a880]"
                    >
                      <Phone className="w-4 h-4 text-[#c5a880]" />
                      <span>{selectedLead.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="p-3 bg-white/5 border border-white/10 flex items-center space-x-3 text-xs text-[#f5f2eb] hover:border-[#c5a880] truncate"
                    >
                      <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                      <span className="truncate">{selectedLead.email}</span>
                    </a>
                  </div>

                  {/* Project Vision Description */}
                  {selectedLead.projectDescription && (
                    <div className="p-4 bg-white/5 border border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block mb-1">
                        Client Vision &amp; Notes
                      </span>
                      <p className="text-xs text-[#d8d9de] font-light leading-relaxed">
                        {selectedLead.projectDescription}
                      </p>
                    </div>
                  )}

                  {/* Internal Builder Notes */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#c5a880] font-medium block">
                      Internal Builder Notes &bull; Derek &amp; Xiochil
                    </span>

                    <div className="space-y-2">
                      {(selectedLead.notes || []).map((n, idx) => (
                        <div key={idx} className="p-3 bg-black/50 border border-white/5 text-xs text-[#a8a9b0]">
                          {n}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add site consultation notes..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="flex-grow bg-[#07080a] border border-white/15 px-3 py-2 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                      />
                      <button
                        onClick={() => handleAddNote(selectedLead.id)}
                        className="px-4 py-2 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase tracking-wider hover:bg-[#d8be96] cursor-pointer"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-[#111216] border border-white/5 text-[#8e9099]">
                  Select a lead from the inbox to review project specifications.
                </div>
              )}
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && <MediaAssetsManager />}

        {/* TELEMETRY TAB */}
        {activeTab === 'telemetry' && (
          <div className="p-8 bg-[#111216] border border-white/10 space-y-6">
            <h3 className="font-serif text-2xl text-[#f5f2eb]">
              Event Tracking &amp; Conversion Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099]">
              Live conversion funnel events logged in browser session. In production, this relays to Google Analytics 4 &amp; Meta Pixel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase text-[#6e7078] block">Lead Inquiries</span>
                <span className="font-serif text-2xl text-[#c5a880]">{leads.length}</span>
              </div>
              <div className="p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase text-[#6e7078] block">Hot Leads</span>
                <span className="font-serif text-2xl text-rose-400">
                  {leads.filter((l) => l.score === 'HOT').length}
                </span>
              </div>
              <div className="p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase text-[#6e7078] block">Gallery Views</span>
                <span className="font-serif text-2xl text-[#f5f2eb]">{imagesCount} Items</span>
              </div>
              <div className="p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase text-[#6e7078] block">Video Assets</span>
                <span className="font-serif text-2xl text-[#f5f2eb]">{videosCount} Featured</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
