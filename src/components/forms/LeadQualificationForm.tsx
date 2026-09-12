import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Shield, Sparkles, Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { trackEvent } from '../../utils/analytics';
import { Button } from '../ui/Button';

export const LeadQualificationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form state
  const [formData, setFormData] = useState({
    location: '',
    ownsLand: 'yes' as 'yes' | 'under_contract' | 'looking' | 'no',
    landDetails: '',
    projectType: 'custom_home' as 'custom_home' | 'arbor_valley' | 'acreage_estate' | 'other',
    investmentRange: '$650k - $900k',
    timeline: '3_6_months' as 'immediate' | '1_3_months' | '3_6_months' | '6_12_months' | 'exploring',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'phone' as 'phone' | 'email' | 'text',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedReference, setAssignedReference] = useState('');

  const handleNext = () => {
    // Validate current step
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !formData.location.trim()) {
      newErrors.location = 'Please specify your anticipated build location.';
    } else if (step === 6) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email address is required.';
      if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = 'Valid phone number is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    trackEvent('form_step_complete', { step, totalSteps });

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      trackEvent('form_submit', {
        projectType: formData.projectType,
        location: formData.location,
        investmentRange: formData.investmentRange,
      });

      // Submit through lead scoring engine
      const lead = leadService.submitLead({
        location: formData.location,
        ownsLand: formData.ownsLand,
        landDetails: formData.landDetails,
        projectType: formData.projectType,
        investmentRange: formData.investmentRange,
        timeline: formData.timeline,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredContact,
        projectDescription: formData.projectDescription,
      });

      setAssignedReference(lead.id.toUpperCase());
      setIsSubmitted(true);
    } catch {
      setErrors({ submit: 'We encountered an error processing your inquiry. Please contact our office directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#121317] border border-[#c5a880]/30 p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-[#c5a880]/20 border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#c5a880] block mb-2">
          Inquiry Ref: {assignedReference}
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-4">
          Thank You, {formData.fullName}.
        </h3>

        <p className="text-sm font-light text-[#d8d9de] leading-relaxed mb-6 max-w-lg mx-auto">
          Your custom home project parameters have been received. Derek and Xiochil Blades personally review every submission against our upcoming construction calendar.
        </p>

        <div className="p-4 bg-black/40 border border-white/10 text-left max-w-md mx-auto mb-8 text-xs text-[#a8a9b0] space-y-2">
          <div className="flex justify-between border-b border-white/5 pb-1">
            <span className="text-[#6e7078]">Build Location:</span>
            <span className="text-[#f5f2eb]">{formData.location}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1">
            <span className="text-[#6e7078]">Anticipated Window:</span>
            <span className="text-[#f5f2eb]">{formData.timeline.replace('_', ' ').toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e7078]">Direct Follow-up:</span>
            <span className="text-[#c5a880]">Within 1 Business Day</span>
          </div>
        </div>

        <Button
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
          }}
          variant="outline"
          size="sm"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#111216] border border-white/10 p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
      {/* Progress Header */}
      <div className="mb-8 pb-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-[#c5a880] font-medium block">
            Plan Your Home &bull; Qualification Funnel
          </span>
          <span className="text-xs text-[#8e9099] mt-1 block">
            Step {step} of {totalSteps}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center space-x-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 transition-all duration-300 ${
                idx + 1 === step
                  ? 'w-6 bg-[#c5a880]'
                  : idx + 1 < step
                  ? 'w-3 bg-[#c5a880]/60'
                  : 'w-3 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Location */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              Where are you planning to build?
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              We primarily construct in Wichita, Valley Center, and surrounding Sedgwick County acreage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Valley Center (Arbor Valley)',
              'Valley Center (Private Land)',
              'Wichita (East / Perimeter)',
              'Wichita (West / Maize Area)',
              'Sedgwick County Acreage',
              'Other Surrounding Community',
            ].map((loc) => (
              <button
                type="button"
                key={loc}
                onClick={() => setFormData({ ...formData, location: loc })}
                className={`p-4 text-left text-xs uppercase tracking-wider transition-all border ${
                  formData.location === loc
                    ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#f5f2eb]'
                    : 'bg-white/5 border-white/10 text-[#a8a9b0] hover:border-white/30'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="custom-loc" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-2">
              Or specify exact parcel / city:
            </label>
            <input
              id="custom-loc"
              type="text"
              placeholder="e.g. 5 acres off 109th St N, Valley Center"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#0a0b0d] border border-white/15 px-4 py-3 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
            />
            {errors.location && <p className="text-xs text-rose-400 mt-1.5">{errors.location}</p>}
          </div>
        </div>
      )}

      {/* STEP 2: Land Ownership */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              Do you already own land?
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              Whether you already hold deed to acreage or are exploring lots in Arbor Valley, we adapt our onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { val: 'yes', label: 'Yes, I own the parcel', sub: 'Ready for site engineering & architectural design' },
              { val: 'under_contract', label: 'Under Contract', sub: 'Closing on land soon' },
              { val: 'looking', label: 'Actively Looking', sub: 'Evaluating parcels & open to guidance' },
              { val: 'no', label: 'Interested in Arbor Valley', sub: 'Seeking half-acre community homesites' },
            ].map((item) => (
              <button
                type="button"
                key={item.val}
                onClick={() => setFormData({ ...formData, ownsLand: item.val as any })}
                className={`p-5 text-left transition-all border ${
                  formData.ownsLand === item.val
                    ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#f5f2eb]'
                    : 'bg-white/5 border-white/10 text-[#a8a9b0] hover:border-white/30'
                }`}
              >
                <div className="text-sm font-medium uppercase tracking-wider text-[#f5f2eb] mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-[#8e9099] font-light">
                  {item.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Project Type */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              What are you looking to build?
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              Select the primary scope of your residential project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { val: 'custom_home', title: 'Custom Single-Family Home', desc: 'Bespoke design from foundation to finish' },
              { val: 'arbor_valley', title: 'Arbor Valley Community Build', desc: 'Half-acre neighborhood lot in Valley Center' },
              { val: 'acreage_estate', title: 'Acreage Homestead / Estate', desc: 'Custom residence with outbuildings / shop' },
              { val: 'other', title: 'Architectural Consultation', desc: 'Existing architectural plans ready to bid' },
            ].map((p) => (
              <button
                type="button"
                key={p.val}
                onClick={() => setFormData({ ...formData, projectType: p.val as any })}
                className={`p-5 text-left transition-all border ${
                  formData.projectType === p.val
                    ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#f5f2eb]'
                    : 'bg-white/5 border-white/10 text-[#a8a9b0] hover:border-white/30'
                }`}
              >
                <div className="text-sm font-medium uppercase tracking-wider text-[#f5f2eb] mb-1">
                  {p.title}
                </div>
                <div className="text-xs text-[#8e9099] font-light">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Approximate Investment */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              Approximate Investment Range?
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              With open-book pricing, your budget guides architectural space planning and finish specifications without hidden surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              '$500k - $650k',
              '$650k - $800k',
              '$800k - $1.1M',
              '$1.1M - $1.5M+',
              'Evaluating Options / Flexible',
            ].map((range) => (
              <button
                type="button"
                key={range}
                onClick={() => setFormData({ ...formData, investmentRange: range })}
                className={`p-4 text-left text-xs uppercase tracking-wider transition-all border ${
                  formData.investmentRange === range
                    ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#f5f2eb]'
                    : 'bg-white/5 border-white/10 text-[#a8a9b0] hover:border-white/30'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Timeline */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              When are you looking to build?
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              Our intentional project volume allows us to reserve dedicated production windows for clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { val: 'immediate', label: 'Immediately (Ready to Design/Break Ground)' },
              { val: '1_3_months', label: '1 to 3 Months (In final planning)' },
              { val: '3_6_months', label: '3 to 6 Months (Ideal planning window)' },
              { val: '6_12_months', label: '6 to 12 Months (Future relocation)' },
              { val: 'exploring', label: '12+ Months / Exploring Feasibility' },
            ].map((t) => (
              <button
                type="button"
                key={t.val}
                onClick={() => setFormData({ ...formData, timeline: t.val as any })}
                className={`p-4 text-left text-xs uppercase tracking-wider transition-all border ${
                  formData.timeline === t.val
                    ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#f5f2eb]'
                    : 'bg-white/5 border-white/10 text-[#a8a9b0] hover:border-white/30'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: Contact Info */}
      {step === 6 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              Your Contact Information
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              Derek and Xiochil Blades will reach out directly. We respect your privacy and never sell data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-1.5">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. John & Sarah Miller"
                className="w-full bg-[#0a0b0d] border border-white/15 px-4 py-3 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
              />
              {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-1.5">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. contact@example.com"
                className="w-full bg-[#0a0b0d] border border-white/15 px-4 py-3 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-1.5">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(316) 555-0123"
                className="w-full bg-[#0a0b0d] border border-white/15 px-4 py-3 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
              />
              {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="preferredContact" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-1.5">
                Preferred Method of Contact
              </label>
              <select
                id="preferredContact"
                value={formData.preferredContact}
                onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                className="w-full bg-[#0a0b0d] border border-white/15 px-4 py-3 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Project Description */}
      {step === 7 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-2">
              Tell Us About Your Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9099] font-light">
              Mention desired square footage, bedroom count, architectural style, or any specific lifestyle requirements.
            </p>
          </div>

          <div>
            <label htmlFor="projectDesc" className="block text-xs uppercase tracking-wider text-[#a8a9b0] mb-1.5">
              Project Description &amp; Notes (Optional)
            </label>
            <textarea
              id="projectDesc"
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder="e.g. We are envisioning a 3,200 sq ft modern farmhouse with a 3-car garage, daylight basement, and outdoor living area facing east for morning light..."
              className="w-full bg-[#0a0b0d] border border-white/15 p-4 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
            />
          </div>

          <div className="p-4 bg-white/5 border border-white/10 text-xs text-[#a8a9b0] flex items-center space-x-3">
            <Shield className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>
              By submitting, your details are held confidentially under our direct principal consultation protocol.
            </span>
          </div>
        </div>
      )}

      {/* Step Navigation Controls */}
      <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center text-xs tracking-wider uppercase text-[#a8a9b0] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        <Button
          onClick={handleNext}
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="group"
        >
          <span>
            {step === totalSteps
              ? isSubmitting
                ? 'Processing...'
                : 'Submit Project Inquiry'
              : 'Next Step'}
          </span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
