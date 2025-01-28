export const templates = [
    { id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.png"
    },
    { id: "software-proposal",
        label: "Project Proposal",
        imageUrl: "/software-proposal.svg",
        initialContent: `
            <h1>Project Proposal</h1>
            <h2>Project Overview</h2>
            <p>Breif description of the proposed project proposal p</p>

            <h2>Scope of Work</h2>
            <p>Detailed breakdown of the deliverables and requirements.</p>
        `
    },
    { id: "project-proposal",
        label: "Software Proposal",
        imageUrl: "/project-proposal.svg",
        initialContent: `
            <h1>Software Proposal</h1>
            <p>Use this document to propose your software project.</p>
        `
    },
    { id: "business-letter",
        label: "Business Letter",
        imageUrl: "/letter.svg",
        initialContent: `
            <h1>Business Letter</h1>
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>[Email Address]</p>
            <p>[Phone Number]</p>
            <p>[Date]</p>

            <p>[Recipient's Name]</p>
            <p>[Recipient's Title]</p>
            <p>[Company's Name]</p>
            <p>[Company's Address]</p>
            <p>[City, State, ZIP Code]</p>

            <p>Dear [Recipient's Name],</p>

            <p>[Your introductory paragraph. State the purpose of your letter and any relevant details.]</p>

            <p>[Your main content. Provide more details, explanations, or arguments to support the purpose of your letter.]</p>

            <p>[Your closing paragraph. Summarize your points and state any actions you expect from the recipient.]</p>

            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    },
    { id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        initialContent: `
            <h1>Resume</h1>
            <h2>Contact Information</h2>
            <p>Name: [Your Name]</p>
            <p>Address: [Your Address]</p>
            <p>Phone: [Your Phone Number]</p>
            <p>Email: [Your Email]</p>

            <h2>Professional Summary</h2>
            <p>[A brief summary of your professional background and skills]</p>

            <h2>Work Experience</h2>
            <h3>[Job Title]</h3>
            <p>[Company Name], [Location]</p>
            <p>[Start Date] - [End Date]</p>
            <ul>
                <li>[Responsibility/Accomplishment]</li>
                <li>[Responsibility/Accomplishment]</li>
                <li>[Responsibility/Accomplishment]</li>
            </ul>

            <h3>[Job Title]</h3>
            <p>[Company Name], [Location]</p>
            <p>[Start Date] - [End Date]</p>
            <ul>
                <li>[Responsibility/Accomplishment]</li>
                <li>[Responsibility/Accomplishment]</li>
                <li>[Responsibility/Accomplishment]</li>
            </ul>

            <h2>Education</h2>
            <p>[Degree], [Major]</p>
            <p>[University Name], [Location]</p>
            <p>[Graduation Date]</p>

            <h2>Skills</h2>
            <ul>
                <li>[Skill 1]</li>
                <li>[Skill 2]</li>
                <li>[Skill 3]</li>
            </ul>

            <h2>Certifications</h2>
            <p>[Certification Name], [Issuing Organization]</p>
            <p>[Date]</p>
        `
    },
    { id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/cover-letter.svg",
        initialContent: `
            <h1>Cover Letter</h1>
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>[Email Address]</p>
            <p>[Phone Number]</p>
            <p>[Date]</p>

            <p>[Recipient's Name]</p>
            <p>[Recipient's Title]</p>
            <p>[Company's Name]</p>
            <p>[Company's Address]</p>
            <p>[City, State, ZIP Code]</p>

            <p>Dear [Recipient's Name],</p>

            <p>I am writing to express my interest in the [Job Title] position at [Company's Name] as advertised on [Where You Found the Job Posting]. With my background in [Your Field or Major], I am confident that I can contribute effectively to your team.</p>

            <p>In my previous role at [Your Previous Company], I [Describe a Key Achievement or Responsibility]. This experience has equipped me with [Relevant Skills or Knowledge], which I believe will be beneficial for the [Job Title] role at [Company's Name].</p>

            <p>I am particularly drawn to this opportunity at [Company's Name] because [Explain Why You Are Interested in the Company or Role]. I am excited about the prospect of bringing my unique skills to your team and contributing to [Company's Name]'s success.</p>

            <p>Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and certifications will be an asset to your team. Please feel free to contact me at [Your Phone Number] or via email at [Your Email Address] to schedule an interview.</p>

            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    },
];
