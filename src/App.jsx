import { useState, useEffect } from 'react'
import './App.less'

function App() {

  // My vars
  const [data, setData] = useState({})
  const [showLinks, setShowLinks] = useState(false)
  const apiKey = import.meta.env.VITE_SHEETS_API_KEY
  const sheetId = '1zi7NlSfndR0Wb14Z007yRfGt0nrpHYBWrBrKTl-bb2o'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`


  // Fetch data from the google sheet
  useEffect( 
    () => {
      fetch(url)
      .then(response => response.json())
      .then(meta => {
        const result = {}
        const sheetNames = meta.sheets.map(sheet => sheet.properties.title)
        const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=${sheetNames.join('&ranges=')}&key=${apiKey}`
        fetch(batchUrl)
        .then(response => response.json())
        .then(data => {
          data.valueRanges.forEach(range => {
            const sheetName = range.range.split('!')[0].replace(/'/g, '')
            result[sheetName] = transformData(range.values)
          })
          setData(result)
        })
      }
      )
    }, 
    []
  )

  // Map data to json
  const transformData = (values) => {
    const headers = values[0]
    const data = values.slice(1)
    return data.map( row => {  
      return headers.reduce(
        (dict, header, i) => {
          dict[header] = row[i]
          return dict
        },
        {}
      )
      })
  }



  return (
    <>
      <header>
          <div className="header">
            <div>Caroline Ghisolfi</div>
            <div className="social-icons">
              <a href="https://linkedin.com/in/caroline-ghisolfi/" target="_blank"><i className="fab fa-linkedin"></i></a>
              <a href="https://x.com/yourhandle" target="_blank"><i className="fab fa-x-twitter"></i></a>
              <a href="https://github.com/carolineeghisolfi" target="_blank"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </header>
      <div className="container">

        {/* Intro */}
        <section className="intro">
          <div className="profile-image">
            <img src="/profile-image.jpg" alt="Caroline Ghisolfi" />
          </div>
          <div className="intro-text">
            <h1>Hello, I'm Caroline.<span className="subtitle">I am a data journalist and editor.</span></h1>
            <p>{data.vars && data.vars[0].intro}</p>
            <div 
              className="contact"
              onMouseEnter={() => setShowLinks(true)}
              onMouseLeave={() => setShowLinks(false)}
              onClick={() => setShowLinks(!showLinks)}
            >
              <span className="contact-text">Get in touch ▸</span>
              {showLinks && (
                <span className="links">
                  <a href="mailto:caroline.ghisolfi@houstonchronicle.com" target="_blank">Email</a> · <a href="https://www.linkedin.com/in/caroline-ghisolfi/" target="_blank">LinkedIn</a>
                </span>
              )}
            </div>
          </div>
        </section>

        <hr />

        {/* Bio */}
        <section className="about">
          <h2>About me</h2>
          {data.vars && <p dangerouslySetInnerHTML={{ __html: data.vars[0].about }}/>}
        </section>

        <hr />

        {/* Clips */}
        <section className="clips">
          <h2>Clips</h2>
          <div className="clips-list">
            {
              data.clips && data.clips
              .filter(clip => clip.publish === 'TRUE')
              .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date))
              .map(clip => (
                <div className="clip-item">
                  <div>
                    <span className="pub-site">{clip.pub_site}</span> · 
                    {' '}<span className="pub-date">{new Date(clip.pub_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h3><a href={clip.live_url ? clip.live_url : clip.pdf_url}>{clip.headline}</a></h3>
                  {clip.pdf_url && <span className="pdf-url"><a href={clip.pdf_url} target="_blank">DOWNLOAD PDF</a></span>}
                  {clip.synopsis && <p className="synopsis" dangerouslySetInnerHTML={{ __html: clip.synopsis }}/>}
                  {clip.impact && <p className="impact" dangerouslySetInnerHTML={{ __html: clip.impact }}/>}
                  {clip.awards && <p className="awards" dangerouslySetInnerHTML={{ __html: clip.awards }}/>}
                </div>
              ))
            }

          </div>
        </section>
      </div>
      <footer>
        <p>Developed and designed by Caroline Ghisolfi</p>
        <p>© 2026 Caroline Ghisolfi</p>
      </footer>
    </>
  )
}

export default App
