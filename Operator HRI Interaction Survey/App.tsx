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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzhsHe9V2NKg-EEknO-qecaXy6LPbdpyYCp98vKJZxgZXlf1sCX0Q8XpI5ccKIXViQ/exec";

const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/48b8af7a-5805-455e-b58b-2d1b0de29183/page/cnTlF";

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
      app_source: "hri_operator_survey", // Tag to identify source
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
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
    setShowResults(false);
    setIframeLoaded(false);
    window.scrollTo(0, 0);
  };

  // --- Render ---

if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        
        {/* --- 1. PASTE THE NEW HEADER HERE --- */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">Operator/Engineer Survey Results</h2>
          <button 
            onClick={() => setShowResults(false)}
            className="text-slate-500 hover:text-slate-700 font-medium text-sm"
          >
            ✕ Close Results
          </button>
        </div>

        {/* --- 2. PASTE THE IFRAME CONTAINER HERE --- */}
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

      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Submission Received!</h2>
          <p className="text-slate-600 mb-6">Thank you for completing the survey. Your response has been securely recorded.</p>
          
          <div className="space-y-3"> {/* [UPDATE] Added a container for spacing */}
            
            <button
              onClick={() => setShowResults(true)} 
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5 text-indigo-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Global Results
            </button>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
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
            HRI Operator/Engineer Interaction Survey
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-line">
            This survey focuses on Human-Robot-Interaction (HRI), gathering specialized feedback from operators and engineers involved in the design, programming, or daily supervision of robotic systems in industrial environments. All answers are and will remain confidential.
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
            <div className="space-y-3">
              <label htmlFor="department" className="block text-sm font-medium text-slate-700">Department:</label>
              <select
                id="department"
                value={formData.department as string || ''}
                onChange={(e) => handleChange('department', e.target.value)}
                className="block w-full p-3 rounded-md border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                required
              >
                <option value="" disabled>Select a department...</option>
                {[
                  'Production / Assembly',
                  'Logistics / Warehousing',
                  'Quality Control',
                  'Maintenance / Engineering',
                  'Management / Administration',
                  'Other'
                ].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Optional Email Question */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email as string || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="name@company.com"
                className="block w-full p-3 rounded-md border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
              />
            </div>

            {/* Question: Country */}
            <div className="space-y-3">
              <label htmlFor="country" className="block text-sm font-medium text-slate-700">Country:</label>
              <select
                id="country"
                value={formData.country as string || ''}
                onChange={(e) => handleChange('country', e.target.value)}
                className="block w-full p-3 rounded-md border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                required
              >
                <option value="" disabled>Select a country...</option>
                {COUNTRIES.map((countryName) => (
                  <option key={countryName} value={countryName}>{countryName}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Question 3: Years of Experience */}
            <div className="space-y-3">
              <label htmlFor="years_experience" className="block text-sm font-medium text-slate-700">Years of work experience</label>
              <select
                id="years_experience"
                value={formData.years_experience as string || ''}
                onChange={(e) => handleChange('years_experience', e.target.value)}
                className="block w-full p-3 rounded-md border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                required
              >
                <option value="" disabled>Select experience range...</option>
                {['0 - 5 years', '6-10 years', '11-15 years', '15+ years', 'More'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </Section>

          {/* Section 2: Usability & Interface */}
          <Section 
            title="2. Usability & Interface" 
            description=""
          >
            <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200">
              <label className="block text-lg font-medium text-slate-800 mb-4">
                I have received training before using the robot's operating tool.
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {['Yes', 'No'].map((val) => (
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
              {formData.training_received === 'Yes' && (
                <div className="mt-6 border-t border-slate-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                   <LikertQuestion 
                    id="training_quality"
                    question="If Yes, rate your training quality overall:"
                    value={formData.training_quality as number}
                    onChange={handleChange}
                    labels={['Poor', 'Fair', 'Average', 'Good', 'Excellent']}
                    required
                  />
                </div>
              )}
            </div>

            <LikertQuestion 
              id="interface_intuitive"
              question="The robot's interface (e.g., GUI, controller hardware) is intuitive and easy to use for all required operational tasks."
              value={formData.interface_intuitive as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              required
            />

            <LikertQuestion 
              id="interface_safety_confidence"
              question="In any given time, how confident are you about the robot's interface ability to ensure safety if needed?"
              value={formData.interface_safety_confidence as number}
              onChange={handleChange}
              labels={['Not at all Confident', 'Slightly Confident', 'Moderately Confident', 'Confident', 'Very Confident']}
              required
            />
          </Section>

          {/* Section 3: Cognitive Load & Complexity */}
          <Section 
            title="3. Cognitive Load & Complexity" 
            description=""
          >
            <LikertQuestion 
              id="robot_complexity"
              question="How complex is it to operate the robot?"
              value={formData.robot_complexity as number}
              onChange={handleChange}
              labels={['Very Complex', 'Complex', 'Neutral', 'Easy', 'Very Easy']}
              required
            />
            
            <LikertQuestion 
              id="assistance_frequency"
              question="How often do you need documentation or assistance?"
              value={formData.assistance_frequency as number}
              onChange={handleChange}
              labels={['Rarely', 'Occasionally', 'Sometimes', 'Often', 'Very Often']}
              required
            />

            <LikertQuestion 
              id="mental_effort_monitoring"
              question="How much mental effort is required to monitor the robot during shared tasks?"
              value={formData.mental_effort_monitoring as number}
              onChange={handleChange}
              labels={['Very Low Effort', 'Low Effort', 'Moderate Effort', 'High Effort', 'Very High Effort']}
              required
            />

            <LikertQuestion 
              id="information_overload"
              question="How often does the system used to operate the robot overload you with information?"
              value={formData.information_overload as number}
              onChange={handleChange}
              labels={['Rarely', 'Occasionally', 'Sometimes', 'Often', 'Very Often']}
              required
            />
          </Section>

          {/* Section 4: Failures & Recovery */}
          <Section 
            title="4. Failures & Recovery" 
            description=""
          >
            <LikertQuestion 
              id="robot_failure_frequency"
              question="How often do robots fail or require human intervention?"
              value={formData.robot_failure_frequency as number}
              onChange={handleChange}
              labels={['Rarely', 'Occasionally', 'Sometimes', 'Often', 'Very Often']}
              required
            />

            <LikertQuestion 
              id="troubleshooting_ease"
              question="How easy is it to troubleshoot potential failures of the robot or the robot's interface?"
              value={formData.troubleshooting_ease as number}
              onChange={handleChange}
              labels={['Very Hard', 'Hard', 'Neutral', 'Easy', 'Very Easy']}
              required
            />

            <LikertQuestion 
              id="hmi_recovery_tools"
              question="The Human-Machine-Interface (HMI) provides the necessary tools and access to safely and efficiently recover from a failure."
              value={formData.hmi_recovery_tools as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              required
            />
          </Section>

          {/* Section 5: Psychological Impact & Trust */}
          <Section 
            title="5. Psychological Impact & Trust" 
            description=""
          >
            <LikertQuestion 
              id="sense_of_control"
              question="I feel in control of the robot's actions, rather than the robot controlling my workflow."
              value={formData.sense_of_control as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              required
            />

            <LikertQuestion 
              id="job_security_confidence"
              question="I am confident that the introduction of more robots like this will not negatively impact my long-term job security."
              value={formData.job_security_confidence as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              required
            />

            <LikertQuestion 
              id="error_responsibility"
              question="When the system makes a mistake, I feel like I am the one held responsible for the error."
              value={formData.error_responsibility as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              required
            />

            <LikertQuestion 
              id="skill_enhancement"
              question="I feel that operating this robot enhances my professional skills rather than making my job feel repetitive or 'robotic'."
              value={formData.skill_enhancement as number}
              onChange={handleChange}
              labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
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
        
        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Survey System. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default App;