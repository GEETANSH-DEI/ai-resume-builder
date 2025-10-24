import React, { useState } from 'react';
import { Sparkles, Download, Plus, Trash2, Wand2, Save, FileText } from 'lucide-react';

const AIResumeBuilder = () => {
  const [currentSection, setCurrentSection] = useState('personal');
  const [resume, setResume] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [aiSuggestions, setAiSuggestions] = useState({});
  const [showAiPanel, setShowAiPanel] = useState(false);

  // AI-powered content suggestions
  const generateAISuggestion = (field, context) => {
    const suggestions = {
      summary: {
        'software': 'Results-driven Software Engineer with 5+ years of experience in full-stack development. Proven track record of building scalable applications and leading cross-functional teams. Passionate about clean code and innovative solutions.',
        'marketing': 'Creative Marketing Professional with expertise in digital strategy and brand development. Successfully increased client engagement by 150% through data-driven campaigns. Skilled in SEO, content marketing, and social media management.',
        'design': 'Innovative UX/UI Designer with a keen eye for aesthetics and user-centered design. Expert in creating intuitive interfaces that enhance user experience. Proficient in Figma, Adobe Creative Suite, and prototyping tools.',
        'default': 'Motivated professional with strong problem-solving skills and a passion for excellence. Proven ability to deliver results in fast-paced environments. Seeking opportunities to leverage expertise and drive meaningful impact.'
      },
      bulletPoints: {
        'leadership': [
          'Led a team of 5 developers to deliver project 2 weeks ahead of schedule',
          'Mentored junior team members, improving their productivity by 40%',
          'Coordinated cross-functional initiatives involving 3 departments'
        ],
        'technical': [
          'Developed and deployed scalable microservices architecture serving 1M+ users',
          'Optimized database queries resulting in 60% performance improvement',
          'Implemented CI/CD pipeline reducing deployment time by 75%'
        ],
        'sales': [
          'Exceeded sales targets by 125% for three consecutive quarters',
          'Closed deals worth $2M+ in annual recurring revenue',
          'Built and maintained relationships with 50+ enterprise clients'
        ],
        'default': [
          'Successfully completed projects on time and within budget',
          'Collaborated with team members to achieve departmental goals',
          'Implemented process improvements that increased efficiency'
        ]
      },
      skills: {
        'software': ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Git', 'Docker'],
        'marketing': ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'Copywriting'],
        'design': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing'],
        'default': ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Leadership']
      }
    };

    if (field === 'summary') {
      return suggestions.summary[context] || suggestions.summary.default;
    } else if (field === 'bulletPoints') {
      return suggestions.bulletPoints[context] || suggestions.bulletPoints.default;
    } else if (field === 'skills') {
      return suggestions.skills[context] || suggestions.skills.default;
    }
  };

  const applyAISuggestion = (section, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setShowAiPanel(false);
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ['']
      }]
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }));
  };

  const addSkill = (skill) => {
    if (skill && !resume.skills.includes(skill)) {
      setResume(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (index) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const downloadResume = () => {
    alert('In a production app, this would generate a PDF of your resume!');
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Resume Builder
            </h1>
          </div>
          <p className="text-gray-600">Create a professional resume with AI-powered suggestions</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-2">
              <div className="flex flex-wrap gap-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
                      currentSection === section.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Personal Info */}
              {currentSection === 'personal' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                    <button
                      onClick={() => setShowAiPanel(!showAiPanel)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Wand2 className="w-4 h-4" />
                      AI Assist
                    </button>
                  </div>

                  {showAiPanel && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-purple-900 mb-2">AI Summary Suggestions</h3>
                      <div className="space-y-2">
                        {['software', 'marketing', 'design'].map(type => (
                          <button
                            key={type}
                            onClick={() => applyAISuggestion('personal', 'summary', generateAISuggestion('summary', type))}
                            className="w-full text-left p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors text-sm"
                          >
                            <span className="font-medium capitalize">{type}:</span> {generateAISuggestion('summary', type).substring(0, 60)}...
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={resume.personal.name}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, name: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={resume.personal.email}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, email: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={resume.personal.phone}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, phone: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={resume.personal.location}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, location: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={resume.personal.linkedin}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, linkedin: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="Portfolio URL"
                      value={resume.personal.portfolio}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personal: { ...prev.personal, portfolio: e.target.value }
                      }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Professional Summary"
                    value={resume.personal.summary}
                    onChange={(e) => setResume(prev => ({
                      ...prev,
                      personal: { ...prev.personal, summary: e.target.value }
                    }))}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Experience */}
              {currentSection === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </button>
                  </div>

                  {resume.experience.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No experience added yet. Click "Add Experience" to get started!</p>
                    </div>
                  ) : (
                    resume.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">Experience #{index + 1}</h3>
                          <button
                            onClick={() => setResume(prev => ({
                              ...prev,
                              experience: prev.experience.filter((_, i) => i !== index)
                            }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Job Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Start Date"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="End Date"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <textarea
                          placeholder="Key achievements and responsibilities..."
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Education */}
              {currentSection === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education
                    </button>
                  </div>

                  {resume.education.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No education added yet. Click "Add Education" to get started!</p>
                    </div>
                  ) : (
                    resume.education.map((edu, index) => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">Education #{index + 1}</h3>
                          <button
                            onClick={() => setResume(prev => ({
                              ...prev,
                              education: prev.education.filter((_, i) => i !== index)
                            }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Degree"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Graduation Date"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="GPA (optional)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Skills */}
              {currentSection === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                    <button
                      onClick={() => setShowAiPanel(!showAiPanel)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Wand2 className="w-4 h-4" />
                      AI Suggest
                    </button>
                  </div>

                  {showAiPanel && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-purple-900 mb-3">AI Skill Suggestions</h3>
                      <div className="space-y-2">
                        {['software', 'marketing', 'design'].map(type => (
                          <div key={type}>
                            <p className="text-sm font-medium capitalize mb-2">{type}:</p>
                            <div className="flex flex-wrap gap-2">
                              {generateAISuggestion('skills', type).map((skill, i) => (
                                <button
                                  key={i}
                                  onClick={() => addSkill(skill)}
                                  className="px-3 py-1 bg-white rounded-full text-sm hover:bg-purple-100 transition-colors border border-purple-200"
                                >
                                  + {skill}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSkill(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {resume.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {resume.skills.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p>Type a skill and press Enter to add it, or use AI suggestions!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Projects */}
              {currentSection === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  {resume.projects.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No projects added yet. Click "Add Project" to get started!</p>
                    </div>
                  ) : (
                    resume.projects.map((project, index) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">Project #{index + 1}</h3>
                          <button
                            onClick={() => setResume(prev => ({
                              ...prev,
                              projects: prev.projects.filter((_, i) => i !== index)
                            }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Project Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <textarea
                          placeholder="Project Description"
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Technologies Used"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="url"
                          placeholder="Project Link (optional)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Preview
                </h3>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {/* Preview Personal */}
                {resume.personal.name && (
                  <div className="text-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{resume.personal.name}</h2>
                    <p className="text-sm text-gray-600">{resume.personal.email} • {resume.personal.phone}</p>
                    {resume.personal.location && <p className="text-sm text-gray-600">{resume.personal.location}</p>}
                  </div>
                )}

                {/* Preview Summary */}
                {resume.personal.summary && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Summary</h3>
                    <p className="text-sm text-gray-700">{resume.personal.summary}</p>
                  </div>
                )}

                {/* Preview Experience */}
                {resume.experience.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Experience</h3>
                    <div className="text-sm text-gray-600">
                      {resume.experience.length} position(s) added
                    </div>
                  </div>
                )}

                {/* Preview Education */}
                {resume.education.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Education</h3>
                    <div className="text-sm text-gray-600">
                      {resume.education.length} degree(s) added
                    </div>
                  </div>
                )}

                {/* Preview Skills */}
                {resume.skills.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview Projects */}
                {resume.projects.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Projects</h3>
                    <div className="text-sm text-gray-600">
                      {resume.projects.length} project(s) added
                    </div>
                  </div>
                )}

                {!resume.personal.name && (
                  <div className="text-center py-8 text-gray-400">
                    <p>Start filling in your information to see the preview!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;