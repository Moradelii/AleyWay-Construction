import { LeadSubmission, LeadScore } from '../types';

export function calculateLeadScore(data: {
  location: string;
  ownsLand: string;
  projectType: string;
  investmentRange: string;
  timeline: string;
  fullName: string;
  email: string;
  phone: string;
  projectDescription: string;
}): { score: LeadScore; reasons: string[] } {
  let scorePoints = 0;
  const reasons: string[] = [];

  // Land Ownership scoring
  if (data.ownsLand === 'yes') {
    scorePoints += 30;
    reasons.push('Owns land ready for development');
  } else if (data.ownsLand === 'under_contract') {
    scorePoints += 25;
    reasons.push('Land under contract');
  } else if (data.projectType === 'arbor_valley') {
    scorePoints += 25;
    reasons.push('Inquiring about Arbor Valley lots');
  } else if (data.ownsLand === 'looking') {
    scorePoints += 15;
    reasons.push('Actively looking for parcel');
  } else {
    scorePoints += 5;
  }

  // Budget/Investment Range scoring
  if (data.investmentRange.includes('$900k+') || data.investmentRange.includes('$1.2M+')) {
    scorePoints += 30;
    reasons.push('High-tier architectural investment range');
  } else if (data.investmentRange.includes('$650k - $900k') || data.investmentRange.includes('$500k - $650k')) {
    scorePoints += 25;
    reasons.push('Strong custom home investment alignment');
  } else if (data.investmentRange.includes('Under $400k')) {
    scorePoints += 5;
    reasons.push('Entry budget; may require scope calibration');
  } else {
    scorePoints += 15;
  }

  // Timeline scoring
  if (data.timeline === 'immediate' || data.timeline === '1_3_months') {
    scorePoints += 25;
    reasons.push('Immediate/near-term build timeline');
  } else if (data.timeline === '3_6_months') {
    scorePoints += 20;
    reasons.push('Prime planning window (3-6 months)');
  } else if (data.timeline === '6_12_months') {
    scorePoints += 15;
    reasons.push('Long-range planning (6-12 months)');
  } else {
    scorePoints += 5;
  }

  // Location scoring (Wichita / Valley Center primary market)
  const loc = data.location.toLowerCase();
  if (loc.includes('valley center') || loc.includes('arbor valley')) {
    scorePoints += 10;
    reasons.push('Core primary market (Valley Center)');
  } else if (loc.includes('wichita') || loc.includes('sedgwick')) {
    scorePoints += 10;
    reasons.push('Core primary market (Wichita/Sedgwick)');
  }

  // Contact completeness
  if (data.fullName && data.email && data.phone) {
    scorePoints += 5;
  }
  if (data.projectDescription && data.projectDescription.length > 30) {
    scorePoints += 5;
    reasons.push('Detailed project vision supplied');
  }

  let finalScore: LeadScore = 'LOW_PRIORITY';
  if (scorePoints >= 75) {
    finalScore = 'HOT';
  } else if (scorePoints >= 55) {
    finalScore = 'QUALIFIED';
  } else if (scorePoints >= 35) {
    finalScore = 'NURTURE';
  } else {
    finalScore = 'LOW_PRIORITY';
  }

  return { score: finalScore, reasons };
}

const STORAGE_KEY = 'aleyway_leads_crm';

export const leadService = {
  getLeads(): LeadSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    // Return sample initial leads for CRM demonstration
    return [
      {
        id: 'lead-101',
        createdAt: '2025-02-18T14:22:00Z',
        location: 'Valley Center, KS',
        ownsLand: 'yes',
        projectType: 'custom_home',
        investmentRange: '$750k - $950k',
        timeline: '1_3_months',
        fullName: 'Marcus & Elena Vance',
        email: 'mvance@example.com',
        phone: '(316) 555-0144',
        preferredContact: 'phone',
        projectDescription: 'We own 2.5 acres north of Valley Center. Seeking open floorplan with 4 bedrooms, detached shop, and full daylight basement.',
        score: 'HOT',
        scoreReasons: ['Owns land ready for development', 'Strong custom home investment alignment', 'Immediate/near-term build timeline'],
        status: 'consultation_scheduled',
      },
      {
        id: 'lead-102',
        createdAt: '2025-02-24T09:15:00Z',
        location: 'Arbor Valley Community',
        ownsLand: 'looking',
        projectType: 'arbor_valley',
        investmentRange: '$600k - $750k',
        timeline: '3_6_months',
        fullName: 'Claire Jenkins',
        email: 'cjenkins@example.com',
        phone: '(316) 555-0891',
        preferredContact: 'email',
        projectDescription: 'Interested in Lot 8 or 12 in Arbor Valley. Looking for a modern ranch layout with zero-entry accessibility.',
        score: 'QUALIFIED',
        scoreReasons: ['Inquiring about Arbor Valley lots', 'Prime planning window (3-6 months)'],
        status: 'new',
      }
    ];
  },

  submitLead(formData: Omit<LeadSubmission, 'id' | 'createdAt' | 'score' | 'scoreReasons' | 'status'>): LeadSubmission {
    const { score, reasons } = calculateLeadScore(formData);
    const newLead: LeadSubmission = {
      ...formData,
      id: `lead-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      score,
      scoreReasons: reasons,
      status: 'new',
    };

    const current = this.getLeads();
    const updated = [newLead, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    return newLead;
  },

  updateLeadStatus(leadId: string, status: LeadSubmission['status']): LeadSubmission | null {
    const leads = this.getLeads();
    let updatedLead: LeadSubmission | null = null;
    const updated = leads.map(l => {
      if (l.id === leadId) {
        updatedLead = { ...l, status };
        return updatedLead;
      }
      return l;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    return updatedLead;
  },

  addNote(leadId: string, note: string): LeadSubmission | null {
    const leads = this.getLeads();
    let updatedLead: LeadSubmission | null = null;
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const notes = l.notes ? [...l.notes, note] : [note];
        updatedLead = { ...l, notes };
        return updatedLead;
      }
      return l;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    return updatedLead;
  }
};
