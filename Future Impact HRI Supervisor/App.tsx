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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhpve94wf3kkciGvjwbkuy7UhWoP65SfzMsbPmNb0zunvMg_XAOeG7gwmiMGR-Qn1E/exec";

const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/0fa9cef1-1cb2-4f2a-94ee-155c312e36bc/page/foTlF"

const App: React.FC = () => {
  const [formData, setFormData] = useState<SurveyResponse>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // --- Handlers ---

  const handleChange = useCallback((id: string, value: string | number | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      app_source: "hri_future_impact_survey",
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

  // --- Render ---

  // [NEW] Dashboard View (Styled like the Supervisor App)
  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navigation Bar - White, Sticky, Right-aligned Close Button */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <h2 className="text-xl font-bold text-slate-800">Future Installment Supervisor Survey Results</h2>
          
          <button 
            onClick={() => setShowResults(false)} 
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
        </div>
      </div>
    );
  }

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
          
          {/* [UPDATED] Correct Message */}
          <p className="text-slate-600 mb-6">
            Thank you for completing the survey. Your response has been securely recorded.
          </p>
          
          <div className="space-y-3">
            
            {/* [UPDATED] Blue Button with Graph Icon */}
            <button
              onClick={() => setShowResults(true)}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Global Results
            </button>

            {/* [UPDATED] White Button for New Survey */}
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
            Future impact of HRI integration
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-line">
            Gathering supervisor insights on the reasons for automation and the expected impact on department dynamics.
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

            {/* Question: Email Address (Optional) */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email as string || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="supervisor@company.com"
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
                <option value="">Select Experience</option>
                <option value="0-5">0-5</option>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
                <option value="16-20">16-20</option>
                <option value="More">More</option>
              </select>
            </div>

            {/* Question: Size of operation */}
            <div className="space-y-2">
              <label htmlFor="size_of_operation" className="block text-sm font-medium text-slate-700">Size of operation:</label>
              <select
                id="size_of_operation"
                required
                value={formData.size_of_operation || ''}
                onChange={(e) => handleChange('size_of_operation', e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              >
                <option value="">Select Size</option>
                <option value="1-50 employees">1-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>

          </Section>

          {/* Section 2: Drivers for Automation */}
          <Section 
            title="2. Drivers for Automation" 
            description="To what extent do the following factors drive the decision to install robots?"
          >
            <LikertQuestion 
              id="driver_productivity"
              question="Improving productivity"
              value={formData.driver_productivity as number}
              onChange={handleChange}
              required
              labels={['Not a factor', 'Minor factor', 'Moderate factor', 'Significant factor', 'Primary Driver']}
            />
            
            <LikertQuestion 
              id="driver_costs"
              question="Reducing long-term costs"
              value={formData.driver_costs as number}
              onChange={handleChange}
              required
              labels={['Not a factor', 'Minor factor', 'Moderate factor', 'Significant factor', 'Primary Driver']}
            />

            <LikertQuestion 
              id="driver_dependency"
              question="Reducing dependency on manual labor"
              value={formData.driver_dependency as number}
              onChange={handleChange}
              required
              labels={['Not a factor', 'Minor factor', 'Moderate factor', 'Significant factor', 'Primary Driver']}
            />

            <LikertQuestion 
              id="driver_safety"
              question="Enhancing worker safety"
              value={formData.driver_safety as number}
              onChange={handleChange}
              required
              labels={['Not a factor', 'Minor factor', 'Moderate factor', 'Significant factor', 'Primary Driver']}
            />

            <LikertQuestion 
              id="driver_labor_shortage"
              question="Mitigating labor shortages"
              value={formData.driver_labor_shortage as number}
              onChange={handleChange}
              required
              labels={['Not a factor', 'Minor factor', 'Moderate factor', 'Significant factor', 'Primary Driver']}
            />

            <LikertQuestion 
              id="driver_innovation_pressure"
              question="How much does the pressure to appear &quot;modern&quot; or &quot;innovative&quot; influence the decision to adopt robots?"
              value={formData.driver_innovation_pressure as number}
              onChange={handleChange}
              required
              labels={['Not at all', 'Slightly', 'Moderately', 'Very much', 'Significantly']}
            />

            <LikertQuestion 
              id="goal_minimize_turnover"
              question="How important is the goal of minimizing the impact of staff turnover and labour shortages?"
              value={formData.goal_minimize_turnover as number}
              onChange={handleChange}
              required
              labels={['Not a Priority', 'Low Priority', 'Medium Priority', 'High Priority', 'Critical Priority']}
            />

            <div className="mt-8 pt-8 border-t border-slate-200">
              <LikertQuestion 
                id="responsibility_comfort"
                question="How comfortable do you feel taking responsibility for decisions made by automated or semi-autonomous systems under your supervision?"
                value={formData.responsibility_comfort as number}
                onChange={handleChange}
                required
                labels={['Very uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable']}
              />
            </div>

          </Section>

          {/* Section 3: Readiness & Concerns */}
          <Section 
            title="3. Readiness & Concerns" 
            description=""
          >
            {/* Question: Preparedness */}
            <div className="space-y-3 mb-8">
              <label className="block text-lg font-medium text-slate-800">
                How prepared do you feel your department is in terms of communication, training, and coordination required for a smooth transition to automation?
              </label>
              <div className="space-y-2">
                {['Fully prepared', 'Mostly prepared', 'Partially prepared', 'Minimally prepared', 'Not prepared at all'].map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${formData.preparedness_level === option 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="preparedness_level"
                        value={option}
                        checked={formData.preparedness_level === option}
                        onClick={() => handleChange('preparedness_level', formData.preparedness_level === option ? undefined : option)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required={formData.preparedness_level === undefined}
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Question: Biggest Concern */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-slate-800">
                As a supervisor, what is your biggest concern regarding this transition?
              </label>
              <div className="space-y-2">
                {([
                  'Morale Drop ( Fear that remaining workers will feel insecure/demotivated )',
                  'Competence gap ( Fear that the involved employees lacks the necessary skills to manage the robots )',
                  "Performance Skepticism ( Fear that the robot's output will not justify the investment in it )",
                  'Resistance in the technology ( Fear that the current workforce will reject or damage the technology )'
                ]).map((option) => (
                  <label 
                    key={option} 
                    className={`
                      block w-full p-3 rounded-md border cursor-pointer transition-colors select-none
                      ${formData.biggest_concern === option 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-slate-300 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="biggest_concern"
                        value={option}
                        checked={formData.biggest_concern === option}
                        onClick={() => handleChange('biggest_concern', formData.biggest_concern === option ? undefined : option)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required={formData.biggest_concern === undefined}
                      />
                      <span className="ml-3 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <LikertQuestion 
                id="team_trust_robot_ability"
                question="I believe my team will trust the robot's ability to perform tasks better than they can."
                value={formData.team_trust_robot_ability as number}
                onChange={handleChange}
                required
                labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              />

              <LikertQuestion 
                id="managing_mental_demand"
                question="I believe that managing a robotic workforce will be less mentally demanding than managing a purely manual workforce."
                value={formData.managing_mental_demand as number}
                onChange={handleChange}
                required
                labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              />

              <LikertQuestion 
                id="importance_understanding_limitations"
                question="Before approving robot integration, how important is it for you to clearly understand the robot’s limitations, failure modes, and edge cases?"
                value={formData.importance_understanding_limitations as number}
                onChange={handleChange}
                required
                labels={['Not Important', 'Slightly Important', 'Moderately Important', 'Very Important', 'Extremely Important']}
              />
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
      </div>
    </div>
  );
};

export default App;