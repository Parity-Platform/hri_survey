import React, { useState, useCallback } from 'react';
import { Section } from './components/Section';
import { LikertQuestion } from './components/LikertQuestion';
import { SurveyResponse } from './types';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGHAosbkGqn0D3REp-7lI8_uRXUOoI2rBf44Jq-f00SBnMcdIiWqBCwsDIpmDqAONN/exec";

const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/f489fdd2-0b74-4a31-a414-2e7914e1dd18/page/HuFIF";

const App: React.FC = () => {
  const [formData, setFormData] = useState<SurveyResponse>({ });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showResults, setShowResults] = useState(false);

  // --- Handlers ---

  const handleChange = useCallback((id: string, value: string | number | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true); // Show "Saving..." on the button

    // 1. Prepare the data payload with a timestamp
    const payload = {
      ...formData,
      app_source: "hri_manual_worker_survey",
      timestamp: new Date().toISOString()
    };

    try {
      // 2. Send the data to your Google Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Essential for Google Scripts
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // 3. Success! Show the "Thank You" screen
      setIsSubmitted(true);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error("Error!", error);
      alert("Submission failed. Please check your internet connection.");
    } finally {
      setIsSaving(false); // Re-enable the button
    }
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitted(false);
    setShowResults(false); // [NEW] Reset the view when starting over
    window.scrollTo(0, 0);
  };

  // --- Render ---

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className={`bg-white p-8 rounded-xl shadow-lg w-full text-center transition-all duration-500 ${showResults ? 'max-w-6xl' : 'max-w-md'}`}>
          
          {!showResults ? (
            // VIEW 1: Thank You Screen
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Submission Received!</h2>
              <p className="text-slate-600 mb-8">Thank you for completing the survey. Your response has been securely recorded.</p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Global Results
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Submit Another Response
                </button>
              </div>
            </>
          ) : (
            // VIEW 2: Looker Studio Dashboard
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-800">Manual Worker Survey Results</h2>
                <button 
                  onClick={() => setShowResults(false)}
                  className="text-slate-500 hover:text-slate-700 font-medium text-sm"
                >
                  ✕ Close Results
                </button>
              </div>
              
              
              <div className="relative w-full h-[1200px] bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
               <iframe 
                  src={LOOKER_STUDIO_URL}
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleReset}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start New Survey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            HRI Manual Worker Interaction Survey
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-line">
            This survey focuses on the direct, daily experiences of manual workers with Human-Robot Interaction (HRI) in industrial environments.
            
            All answers are and will remain confidential.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Honeypot field (anti-bot) */}
        <input
            type="text"
            name="company_website"
            value={(formData as any).company_website || ""}
            onChange={(e) => handleChange("company_website", e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
        />
          
          {/* Section 1: General Information */}
          <Section 
            title="1. General Information" 
            description="Please provide some basic details about your work environment."
          >
            {/* Question 1: Department */}
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-slate-700">Department:</label>
              <select
                id="department"
                required
                value={formData.department || ''}
                onChange={(e) => handleChange('department', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Department</option>
                <option value="Production / Assembly">Production / Assembly</option>
                <option value="Logistics / Warehousing">Logistics / Warehousing</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Maintenance / Engineering">Maintenance / Engineering</option>
                <option value="Management / Administration">Management / Administration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email Address (Optional) */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>:
              </label>
              <input
                type="email"
                id="email"
                value={(formData as any).email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="name@company.com"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              />
            </div>

{/* Country Question */}
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-slate-700">Country:</label>
              <select
                id="country"
                required
                value={(formData as any).country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Question 2: Years of Experience */}
            <div className="space-y-2">
              <label htmlFor="years_experience" className="block text-sm font-medium text-slate-700">Years of work experience:</label>
              <select
                id="years_experience"
                required
                value={formData.years_experience || ''}
                onChange={(e) => handleChange('years_experience', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Years of Experience</option>
                <option value="0–5 years">0-5 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="11–15 years">11-15 years</option>
                <option value="15+ years">15+ years</option>
              </select>
            </div>

            {/* Question 3: Interaction Frequency */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">How often do you interact with robots in your work environment?</label>
              <div className="space-y-2">
                {['Daily', 'Weekly', 'Rarely', 'Never'].map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${formData.interaction_frequency === option 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="interaction_frequency"
                        value={option}
                        checked={formData.interaction_frequency === option}
                        onClick={() => handleChange('interaction_frequency', formData.interaction_frequency === option ? undefined : option)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required={formData.interaction_frequency === undefined}
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          {/* Section 2: Safety & Perceptions */}
          <Section 
            title="2. Safety & Perceptions" 
            description="We are interested in your personal feelings regarding safety and trust when working near robots."
          >
            {/* Risk Assessment */}
            <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200">
              <label className="block text-lg font-medium text-slate-800 mb-4">
                Have you ever felt at risk due to robotic behaviour? <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {['yes', 'no'].map((val) => (
                   <label 
                   key={val} 
                   className={`
                     flex-1 flex items-center justify-center p-3 rounded cursor-pointer border transition-colors capitalize select-none
                     ${formData.risk_felt === val
                       ? 'bg-blue-50 border-blue-500 text-blue-700' 
                       : 'bg-slate-50 border-transparent hover:bg-slate-100'}
                   `}
                 >
                   <input
                     type="radio"
                     name="risk_felt"
                     value={val}
                     checked={formData.risk_felt === val}
                     onClick={() => handleChange('risk_felt', formData.risk_felt === val ? undefined : val)}
                     onChange={() => {}}
                     className="w-4 h-4 text-blue-600 focus:ring-blue-500 mr-2"
                     required={formData.risk_felt === undefined}
                   />
                   <span className="font-medium">{val}</span>
                 </label>
                ))}
              </div>

              {/* Conditional Risk Description */}
              {formData.risk_felt === 'yes' && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <LikertQuestion 
                    id="risk_severity"
                    question="Please rate the severity of the perceived risk:"
                    value={formData.risk_severity as number}
                    onChange={handleChange}
                    labels={['Very Low', 'Low', 'Moderate', 'High', 'Very High']}
                    required
                  />
                </div>
              )}
            </div>

            {/* HRI Perceptions */}
            <LikertQuestion 
              id="perception_safety"
              question="I feel safe when working in close proximity to a robot."
              value={formData.perception_safety as number}
              onChange={handleChange}
              required
            />
            
            <LikertQuestion 
              id="perception_predictability"
              question="I understand how the robot behaves and can predict what it will do next."
              value={formData.perception_predictability as number}
              onChange={handleChange}
              required
            />

            <LikertQuestion 
              id="perception_trust"
              question="I trust the robot to perform its task reliably without making mistakes."
              value={formData.perception_trust as number}
              onChange={handleChange}
              required
            />

          </Section>

          {/* Section 3: Workload & Stress */}
          <Section 
            title="3. Workload & Stress" 
            description="Please rate how working with robots affects your workload and stress levels."
          >
            <LikertQuestion 
              id="productivity_impact"
              question="Working with robots has increased my overall productivity."
              value={formData.productivity_impact as number}
              onChange={handleChange}
              required
            />
            
            <LikertQuestion 
              id="stress_unexpected"
              question="I feel stressed or anxious when the robot performs unexpected actions."
              value={formData.stress_unexpected as number}
              onChange={handleChange}
              required
            />

            <LikertQuestion 
              id="mental_load"
              question="I find it mentally challenging to cooperate and coordinate with the robot."
              value={formData.mental_load as number}
              onChange={handleChange}
              required
            />

            <LikertQuestion 
              id="physical_strain"
              question="The interaction with the robot increases my physical strain or fatigue."
              value={formData.physical_strain as number}
              onChange={handleChange}
              required
            />
          </Section>

          {/* Section 4: Training & Confidence */}
          <Section 
            title="4. Training & Confidence" 
            description="Tell us about your preparation and confidence level."
          >
            <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200">
              <label className="block text-lg font-medium text-slate-800 mb-4">
                I have received training before using the robot. <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {['yes', 'no'].map((val) => (
                   <label 
                   key={val} 
                   className={`
                     flex-1 flex items-center justify-center p-3 rounded cursor-pointer border transition-colors capitalize select-none
                     ${formData.training_received === val
                       ? 'bg-blue-50 border-blue-500 text-blue-700' 
                       : 'bg-slate-50 border-transparent hover:bg-slate-100'}
                   `}
                 >
                   <input
                     type="radio"
                     name="training_received"
                     value={val}
                     checked={formData.training_received === val}
                     onClick={() => handleChange('training_received', formData.training_received === val ? undefined : val)}
                     onChange={() => {}}
                     className="w-4 h-4 text-blue-600 focus:ring-blue-500 mr-2"
                     required={formData.training_received === undefined}
                   />
                   <span className="font-medium">{val}</span>
                 </label>
                ))}
              </div>

              {/* Conditional Training Quality */}
              {formData.training_received === 'yes' && (
                <div className="mt-6 border-t border-slate-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                   <LikertQuestion 
                    id="training_quality"
                    question="Rate your training quality overall:"
                    value={formData.training_quality as number}
                    onChange={handleChange}
                    labels={['Poor', 'Fair', 'Average', 'Good', 'Excellent']}
                    required
                  />

                  <LikertQuestion 
                    id="training_relevance"
                    question="The training I received prepared me well for real-world tasks involving the robot."
                    value={formData.training_relevance as number}
                    onChange={handleChange}
                    labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
                    required
                  />
                </div>
              )}
            </div>

            <LikertQuestion 
              id="confidence_level"
              question="I feel confident operating or interacting with the robot."
              value={formData.confidence_level as number}
              onChange={handleChange}
              labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
              required
            />

            <LikertQuestion 
              id="confidence_autonomy"
              question="I feel confident enough to operate the robot without needing constant supervision or assistance."
              value={formData.confidence_autonomy as number}
              onChange={handleChange}
              labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
              required
            />
          </Section>

          {/* Submit Action */}
          <div className="pt-8 border-t border-slate-200">
             <div className="flex justify-end items-center gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`
                    inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-md text-white 
                    ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
                    transition-all duration-200
                  `}
                >
                  {isSaving ? 'Saving...' : 'Submit Survey'}
                </button>
             </div>
          </div>

        </form>
    
      </div>
    </div>
  );
};

export default App;