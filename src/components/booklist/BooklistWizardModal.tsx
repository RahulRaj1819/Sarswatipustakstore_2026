import React, { useState } from 'react';
import { LOCAL_SCHOOLS, ACADEMIC_SESSIONS } from '../../data/schools';
import { BooklistRequest, StoreSettings } from '../../types';
import { StorageService } from '../../services/storage';
import { generateBooklistRef, getWhatsAppBooklistUrl, formatINR } from '../../utils/helpers';
import { 
  X, 
  FileSpreadsheet, 
  CheckCircle2, 
  Building2, 
  Upload, 
  MessageCircle, 
  ArrowRight, 
  BookOpen, 
  Phone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface BooklistWizardModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onClose: () => void;
  onRequestSubmitted?: (req: BooklistRequest) => void;
}

export const BooklistWizardModal: React.FC<BooklistWizardModalProps> = ({
  isOpen,
  settings,
  onClose,
  onRequestSubmitted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(LOCAL_SCHOOLS[0].id);
  const [customSchoolName, setCustomSchoolName] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [academicSession, setAcademicSession] = useState<string>(ACADEMIC_SESSIONS[0]);
  
  // Custom upload / notes
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Parent Contact details
  const [parentName, setParentName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [locality, setLocality] = useState<string>('Pachrukhi');

  // Completed request
  const [submittedRequest, setSubmittedRequest] = useState<BooklistRequest | null>(null);

  const selectedSchool = LOCAL_SCHOOLS.find(s => s.id === selectedSchoolId);
  const activeBooklist = selectedSchool && selectedSchool.booklists[selectedClass] 
    ? selectedSchool.booklists[selectedClass] 
    : [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !phone.trim()) return;

    const finalSchoolName = selectedSchoolId === 'other' ? customSchoolName : selectedSchool?.name || 'Local School';

    const newRequest: BooklistRequest = {
      id: `blr-${Date.now()}`,
      referenceNumber: generateBooklistRef(),
      schoolName: finalSchoolName,
      classGrade: selectedClass,
      academicSession,
      parentName,
      phone,
      whatsapp: whatsapp || phone,
      address: locality,
      notes,
      booklistImageUrl: uploadedFileName ? `user_upload:${uploadedFileName}` : undefined,
      selectedItems: activeBooklist.map(b => ({
        name: b.name,
        subject: b.subject,
        publisher: b.publisher
      })),
      status: 'pending',
      quoteAmount: activeBooklist.reduce((sum, b) => sum + b.approxPrice, 0),
      createdAt: new Date().toISOString()
    };

    StorageService.createBooklistRequest(newRequest);
    setSubmittedRequest(newRequest);
    if (onRequestSubmitted) onRequestSubmitted(newRequest);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-brand-900 via-brand-800 to-navy text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-heading">
                Get Your School Booklist Ready
              </h3>
              <p className="text-xs text-brand-200">
                Guaranteed NCERT &amp; Syllabus Textbooks in Pachrukhi, Siwan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-900 font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>1</span>
            <span>School &amp; Class</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-brand-900 font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>2</span>
            <span>View Booklist</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-brand-900 font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Your Contact</span>
          </div>
        </div>

        {/* Wizard Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* STEP 1: Select School, Class & Session */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Select School (Pachrukhi &amp; Siwan)
                </label>
                <div className="space-y-2">
                  {LOCAL_SCHOOLS.map((school) => (
                    <label
                      key={school.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedSchoolId === school.id
                          ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="school"
                          checked={selectedSchoolId === school.id}
                          onChange={() => setSelectedSchoolId(school.id)}
                          className="text-brand-700 focus:ring-brand-500"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{school.name}</div>
                          <div className="text-[11px] text-slate-500">{school.location} • {school.board}</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-brand-800 font-semibold">
                        Configured
                      </span>
                    </label>
                  ))}

                  {/* Option for Other School */}
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedSchoolId === 'other'
                        ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="school"
                        checked={selectedSchoolId === 'other'}
                        onChange={() => setSelectedSchoolId('other')}
                        className="text-brand-700 focus:ring-brand-500"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Other School / College in Bihar</div>
                        <div className="text-[11px] text-slate-500">Upload or describe your school booklist</div>
                      </div>
                    </div>
                  </label>
                </div>

                {selectedSchoolId === 'other' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter School Name & Location..."
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                )}
              </div>

              {/* Class & Academic Session Selection */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Class / Grade
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                  >
                    {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11 Science', 'Class 11 Arts/Commerce', 'Class 12'].map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Academic Session
                  </label>
                  <select
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                  >
                    {ACADEMIC_SESSIONS.map((session) => (
                      <option key={session} value={session}>{session}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Continue to Booklist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: View Configured Booklist or Upload File */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-brand-950">
                    {selectedSchoolId === 'other' ? (customSchoolName || 'Other School') : selectedSchool?.name}
                  </span>
                  <div className="text-[11px] text-brand-700">
                    {selectedClass} • Session {academicSession}
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-brand-800 underline font-semibold text-[11px]"
                >
                  Change
                </button>
              </div>

              {/* If books configured */}
              {activeBooklist.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Configured Textbook Syllabus ({activeBooklist.length} Books)</span>
                    <span className="text-emerald-700">
                      Approx Total: ~{formatINR(activeBooklist.reduce((sum, b) => sum + b.approxPrice, 0))}
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-52 overflow-y-auto text-xs">
                    {activeBooklist.map((book, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between bg-white hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-800">{book.name}</div>
                            <div className="text-[10px] text-slate-400">{book.subject} • {book.publisher}</div>
                          </div>
                        </div>
                        <span className="font-bold text-navy">{formatINR(book.approxPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">
                    No pre-set booklist for this grade yet
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                    No problem! Please upload a photo or PDF of your school's booklist slip below, or specify in notes.
                  </p>
                </div>
              )}

              {/* Upload Own Booklist Photo/PDF */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-brand-400 transition-colors bg-slate-50/50">
                <input
                  type="file"
                  id="booklist-upload"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="booklist-upload" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-brand-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-brand-900 block">
                    {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Upload School Booklist Photo / PDF (Optional)'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Click to browse from phone camera or gallery
                  </span>
                </label>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Notes (Specific editions, extra notebooks, stationery combo needed)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please add R.D. Sharma maths book and 6 classmate long registers..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Parent & Contact Details Form */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="text-xs text-slate-500">
                Please provide your contact info so the Sarswati Pustak store team can verify book availability and send you the exact quotation &amp; pickup notice.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parent / Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Kumar"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9835012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Same as mobile or WhatsApp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Locality / Village / Town (Siwan / Pachrukhi area)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pachrukhi Bazaar, Siwan"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                ℹ️ <strong>Honest Store Policy:</strong> Submitting this request checks real physical store inventory. No fake claims. We will confirm exact editions and prepare the book bundle for store pickup or delivery.
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  ← Back to Books
                </button>
                <button
                  type="submit"
                  className="bg-accent-orange hover:bg-accent-orange-dark text-white font-extrabold text-xs px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Booklist Enquiry</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Reference Generation */}
          {step === 4 && submittedRequest && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Booklist Request Successfully Created!
                </span>
                <h3 className="text-xl font-extrabold text-navy font-heading mt-1">
                  Reference: {submittedRequest.referenceNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your booklist request has been submitted to the shop owner at Sarswati Pustak and Sports Bhandar, Pachrukhi.
                </p>
              </div>

              {/* Request Summary Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">School:</span>
                  <span className="font-semibold text-slate-800">{submittedRequest.schoolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Class &amp; Session:</span>
                  <span className="font-semibold text-slate-800">{submittedRequest.classGrade} ({submittedRequest.academicSession})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Parent Name:</span>
                  <span className="font-semibold text-slate-800">{submittedRequest.parentName} ({submittedRequest.phone})</span>
                </div>
                {submittedRequest.quoteAmount && (
                  <div className="flex justify-between border-t border-slate-200 pt-1.5">
                    <span className="text-slate-500">Estimated Booklist Price:</span>
                    <span className="font-bold text-navy">~{formatINR(submittedRequest.quoteAmount)}</span>
                  </div>
                )}
              </div>

              {/* Instant WhatsApp Follow-up CTA */}
              <div className="pt-2 max-w-md mx-auto space-y-2">
                <a
                  href={getWhatsAppBooklistUrl(submittedRequest, settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Reference to Shop WhatsApp Now</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
