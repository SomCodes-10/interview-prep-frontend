import React, { useState, useRef } from 'react'
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from 'react-router';

const Home = () => {

  const { loading, generateReport,reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  if(loading){
    return(
      <main className='loading-screen'>
        <h1>Loading your interview plan</h1>
      </main>
    )
  }

  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header">
        <h1>Create Your Custom <span className="gradient-text">Interview Plan</span></h1>
        <p className="subtitle">Let our AI analyze the job requirements and your unique profile to<br />build a winning strategy.</p>
      </header>

      {/* Main Content - Original Structure */}
      <main className='home'>
        <div className="left">
          <textarea onChange={(e) => { setJobDescription(e.target.value) }} name="jobDescription" id="jobDescription" placeholder='Enter Job Description here...'></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input ref={resumeInputRef} type="file" name='resume' id='resume' accept='.pdf' />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea onChange={(e) => { setSelfDescription(e.target.value) }} name="selfDescription" id="selfDescription" placeholder='Write about you self in afew sentences'></textarea>
          </div>
          <button onClick={handleGenerateReport } className='generate-btn'>✦ Generate Intreview Report</button>
        </div>
      </main>
      
      {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

      {/* Footer */}
      <footer className="home-footer">
        <span className="ai-note">AI-Powered Strategy Generation ~ Approx 30s</span>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <span className="dot">·</span>
          <a href="#">Terms of Service</a>
          <span className="dot">·</span>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
