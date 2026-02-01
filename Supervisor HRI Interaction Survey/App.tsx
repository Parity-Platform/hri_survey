import React, { useState, useCallback } from 'react';
import { Section } from './components/Section';
import { LikertQuestion } from './components/LikertQuestion';
import { SurveyResponse } from './types';

// Place this outside the component or in a separate file
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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGY9y_Tga0i9mIiJvEWLXEooVarQBeM_K7-4cb07z_5l0DFCFUQ8FxNsnrOgjE2uq3/exec";

const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/e43095b6-9351-407a-8b6e-81f03903d8bf/page/1nTIF"

const App: React.FC = () => {
  const [formData, setFormData] = useState<SurveyResponse>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // [NEW] Add these two lines
  const [showResults, setShowResults] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // --- Handlers ---

  const handleChange = useCallback((id: string, value: string | number | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((id: string, option: string) => {
    setFormData((prev) => {
      const currentValues = (prev[id] as string[]) || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      
      return {
        ...prev,
        [id]: newValues,
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      app_source: "hri_manager_survey",
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error("Error!", error);
      alert("Submission failed. Please check your internet connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitted(false);
    setShowResults(false);  // [NEW]
    setIframeLoaded(false); // [NEW]
    window.scrollTo(0, 0);
  };

  // [NEW] Dashboard View Logic
  // [NEW] Dashboard View Logic (Updated to match Manual Worker App)
  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navigation Bar - Matches the "First Photo" style */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <h2 className="text-xl font-bold text-slate-800">Supervisor Survey Results</h2>
          
          <button 
            onClick={() => setShowResults(false)} // Keeps "isSubmitted" true to return to Thank You screen
            className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            <span className="text-xl">&times;</span> Close Results
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="relative w-full h-[2000px] bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
             
            {/* Loading Spinner */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading Analytics Dashboard...</p>
              </div>
            )}

            {/* The Iframe */}
            <iframe 
              src={LOOKER_STUDIO_URL}
              className={`absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-700 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setIframeLoaded(true)}
            ></iframe>
          </div>
          
          {/* Bottom "Start New Survey" Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              Start New Survey
            </button>
          </div>
        </div>
      </div>
    );
  }
  

  // --- Render ---

 if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          
          {/* Green Check Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Submission Received!</h2>
          
          {/* Custom Message */}
          <p className="text-slate-600 mb-6">
            Thank you for completing the survey. Your response has been securely recorded.
          </p>
          
          <div className="space-y-3">
            
            {/* Blue Button: View Global Results WITH GRAPH ICON */}
            <button
              onClick={() => setShowResults(true)}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              {/* This is the missing graph icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Global Results
            </button>

            {/* White Button: Submit Another Response */}
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Submit Another Response
            </button>
            
          </div>
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
            HRI Manager/Supervisor Survey
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-line">
            This survey focuses on Human-Robot Interaction (HRI), gathering strategic insights from supervisors, managers, and decision-makers who oversight robotic systems departments.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
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

            {/* Question: Email (Optional) */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address <span className="text-slate-400 font-normal">(Optional)</span>:</label>
              <input
                type="email"
                id="email"
                value={formData.email as string || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@company.com"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              />
            </div>

{/* Question: Country */}
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-slate-700">Country:</label>
              <select
                id="country"
                required
                value={formData.country || ''}
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

            {/* Question 2: Size of operation */}
            <div className="space-y-2">
              <label htmlFor="operation_size" className="block text-sm font-medium text-slate-700">Size of operation:</label>
              <select
                id="operation_size"
                required
                value={formData.operation_size || ''}
                onChange={(e) => handleChange('operation_size', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Size</option>
                {['1-50 employees', '51-200 employees', '201-500 employees', '500+ employees'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Question 3: Number of employees interacting with robots */}
            <div className="space-y-2">
              <label htmlFor="employees_interacting" className="block text-sm font-medium text-slate-700">Number of employees interacting with robots:</label>
              <select
                id="employees_interacting"
                required
                value={formData.employees_interacting || ''}
                onChange={(e) => handleChange('employees_interacting', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Number of Employees</option>
                {['1-30', '31-60', '61-100', 'More'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </Section>

          {/* Section 2: Reasons for Robot Adoption */}
          <Section 
            title="2. Reasons for Robot Adoption" 
            description=""
          >
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">What are the main reasons for adopting robots in the workforce?</label>
              <div className="space-y-2">
                {['Reduce physical strain', 'Reduce labour costs', 'Increase quality', 'Improve safety', 'Speed up production', 'Other'].map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${formData.adoption_reasons === option 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="adoption_reasons"
                        value={option}
                        checked={formData.adoption_reasons === option}
                        onClick={() => handleChange('adoption_reasons', formData.adoption_reasons === option ? undefined : option)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required={formData.adoption_reasons === undefined}
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          {/* Section 3: Evaluation of impact after robot integration */}
          <Section 
            title="3. Evaluation of impact after robot integration" 
            description=""
          >
            <LikertQuestion 
              id="impact_productivity"
              question="Productivity:"
              value={formData.impact_productivity as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Very strong']}
              required
            />
            
            <LikertQuestion 
              id="impact_safety"
              question="Worker Safety:"
              value={formData.impact_safety as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Very strong']}
              required
            />

            <LikertQuestion 
              id="impact_quality"
              question="Product Quality:"
              value={formData.impact_quality as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Very strong']}
              required
            />

            <LikertQuestion 
              id="impact_satisfaction"
              question="Worker Satisfaction:"
              value={formData.impact_satisfaction as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Very strong']}
              required
            />

            <LikertQuestion 
              id="impact_cost"
              question="Cost Reduction:"
              value={formData.impact_cost as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Very strong']}
              required
            />
          </Section>

          {/* Section 4: Final Evaluation */}
          <Section 
            title="4. Final Evaluation" 
            description=""
          >
            <LikertQuestion 
              id="team_adaptation_rating"
              question="How would you rate your team’s overall adaptation to working alongside robots?"
              value={formData.team_adaptation_rating as number}
              onChange={handleChange}
              labels={['Very Poor', 'Poor', 'Neutral', 'Strong', 'Excellent']}
              required
            />

            <div className="mt-8 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                How has robot integration changed your responsibilities as a supervisor?
              </label>
              <div className="space-y-2">
                {([
                  'More time spent on coordinating workflows',
                  'Increased need for technical oversight',
                  'Reduced involvement in repetitive tasks',
                  'More time spent on employee support and training',
                  'No significant change'
                ]).map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${(formData.supervisor_responsibility_changes || []).includes(option)
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(formData.supervisor_responsibility_changes || []).includes(option)}
                        onChange={() => handleCheckboxChange('supervisor_responsibility_changes', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                What type of support would be most critical for ensuring a smooth and successful further integration of robots in your department?
              </label>
              <div className="space-y-2">
                {([
                  'Additional staff training',
                  'Technical support from robot suppliers',
                  'More detailed performance data and analytics',
                  'Financial resources for upgrades and maintenance',
                  'Clearer cross-department coordination',
                  'Other'
                ]).map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${(formData.critical_support_needed || []).includes(option)
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(formData.critical_support_needed || []).includes(option)}
                        onChange={() => handleCheckboxChange('critical_support_needed', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                What aspect of the integration process would you improve if the transition were repeated?
              </label>
              <div className="space-y-2">
                {([
                  'Improve training and upskilling of employees',
                  'Increase the testing and calibration period before full deployment',
                  'Ensure faster or more reliable technical support during early stages',
                  'Better planning of workflow redesign around robots',
                  'No major improvements needed — the transition was smooth',
                  'Other'
                ]).map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${(formData.integration_improvements || []).includes(option)
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(formData.integration_improvements || []).includes(option)}
                        onChange={() => handleCheckboxChange('integration_improvements', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
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
        
        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Survey System. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default App;