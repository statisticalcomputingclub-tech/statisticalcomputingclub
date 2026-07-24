/* ============================================================
   SCC WEBSITE CONTENT
   ============================================================
   This is the ONLY file you should need to edit to update the
   website day-to-day. No coding knowledge required — just find
   the section you want (search for its ALL_CAPS name below),
   edit the text between the quotes, and save.

   RULES FOR EDITING SAFELY:
   1. Keep the quotes "like this" around every piece of text.
   2. Keep the commas at the end of each line.
   3. Don't remove the curly braces { } or square brackets [ ].
   4. Dates use the format "YYYY-MM-DD" and times use 24hr "HH:MM".
   ============================================================ */

const SCC_CONTENT = {

  /* ---------------------------------------------------------
     1. CLUB BASICS — shown in the header, footer, and hero.
     --------------------------------------------------------- */
  club: {
    name: "Statistical Computing Club",
    shortName: "SCC",
    institution: "Makerere University",
    tagline: "Inspiring Innovation, Building Capacity",
    heroSubtitle:
      "Your campus fam. A family of people interested in applications of statistics, mathematics and economics with computing. We are a student and project led club. Our members span from inspired beginners in the different tools, to masters students. THIS IS IT! The go to place for skilling, networking, leadership and practical exposure.",
    backstory:
      "Having stood for Deputy Speaker MUSSA(Makerere University School of Statistics Association) in 2025, Agaba Ernest was pursuaded by the fact that the courses at the School of Statistics and Planning(SSP) had alot to do with programming using R, STATA, C, Python and SQL. Although this was true, there was no student leader that  SCC was founded by students in the School of Statistics and Planning who wanted more hands-on computing than the standard coursework offered. What started as informal study sessions grew into a registered Guild association: a place to learn tools like R, Python, and SQL properly, work on real datasets, and mentor the next cohort coming up behind us.",
    email: "statisticalcomputingclub@gmail.com", // TODO: replace with the club's real email
    whatsappNumber: "256700000000", // TODO: replace with real WhatsApp number, format: countrycode+number, no + or spaces
    socials: {
      linkedin: "https://www.linkedin.com/in/statistical-computing-club-34a49b370", // URL 
      x: "https://x.com/Statistica64233", // URL
    },
    // Set this to a real, verifiable number when you have one — used in the
    // "impact" stat callout on the home page. Leave the note as-is until then.
    impactStat: {
      value: "35+",
      label: "registered members, per Guild constitution minimum",
    },
  },

  /* ---------------------------------------------------------
     2. UPCOMING MEETINGS & EVENTS
     Used on BOTH the Home page (next 2 shown) and the Events
     page (all of them, as a poster gallery).
     Add a new one by copying an existing block between { and },
     and adding a comma after the closing }.
     --------------------------------------------------------- */
  events: [
     {
      id: "evt-2026-08",
      title: "SCC Semester Kickoff & R Bootcamp",
      date: "2026-08-14",
      time: "16:00",
      endTime: "18:00",
      location: "School of Statistics and Planning, Makerere University",
      description:
        "First meeting of the semester: club overview for new members, then a hands-on introduction to R and RStudio for anyone starting from zero.",
      meetingUrl: "", // TODO: paste a Zoom/Google Meet link here if the session is hybrid/online
      posterImage: "assets/events/27-2-2026.png", // TODO: path to a poster image, e.g. "assets/events/kickoff.jpg"
    },
    //2
    {
      id: "evt-2026-03",
      title: "Time series in R",
      date: "2026-03-13",
      time: "17:00",
      endTime: "18:00",
      location: "SSP Room A-13",
      description:
        "Time series and forecasting methods. The language behind sales forecasting, weather forecasting and more",
      meetingUrl: "", // TODO: paste a Zoom/Google Meet link here if the session is hybrid/online
      posterImage: "assets/events/13-3-2026.jpg", // TODO: path to a poster image, e.g. "assets/events/kickoff.jpg"
    }
   
    // Add future events above this line, following the same pattern.
  ],

  /* ---------------------------------------------------------
     3. RESOURCES — videos and mentor contacts on the Home page.
     --------------------------------------------------------- */
  resources: {
    videos: [
      // Paste YouTube video IDs only (the part after "v=" in a YouTube URL).
      // TODO: replace with real, club-relevant videos.
      { id: "r-vJ9MudP-c", title: "R for Beginners" },
      { id: "kqtD5dpn9C8", title: "Python for Data Analysis" },
    ],
    // TODO: replace with real mentors. Each mentor's card is clickable —
    // tapping it opens a profile with their bio/qualifications and a
    // "send a message" form. That form opens the student's own email app
    // with the message pre-filled and addressed to `email` below (a static
    // site can't silently deliver a message on your behalf without a
    // backend, so this is the honest, no-backend way to route it to the
    // mentor's inbox). Leave `photo` blank to show a placeholder.
    mentors: [
      {
        name: "Add a mentor name",
        role: "e.g. Alumni, Data Analyst at [Company]",
        email: "mentor@example.com",
        photo: "",
        bio: "A couple of sentences on their background and what they help students with.",
        qualifications: "e.g. BSc. Statistics, Makerere University · 3 years in data analytics",
      },
    ],
  },

  /* ---------------------------------------------------------
     4. TESTIMONIALS — short member quotes on the Home page.
     Placeholder text is clearly marked; swap in real quotes
     (with permission) when you have them.
     --------------------------------------------------------- */
  testimonials: [
     {
      quote: "I had the most of the libraries and R was familiar to me. I also knew how to download necessary libraries, generally, I felt like I was moving faster than some of my classmates that were finding certain terms confusing",
      name: "Watela Gift Grace",
      cohort: "Year 2, BSAS",
    },
    {
      quote: "[Placeholder] The hackathons pushed me to build things I didn't think I could build in a weekend.",
      name: "Add member name",
      cohort: "e.g. Year 3, BSQE",
    },
    {
      quote: "[Placeholder] As a Year 1, the mentorship from older members made the club feel less intimidating and more like a community.",
      name: "Add member name",
      cohort: "e.g. Year 1, BPS",
    },
  ],

  /* ---------------------------------------------------------
     5. LEADERSHIP TEAM — About page.
     Roles are taken from the SCC Constitution. Replace names,
     photos, and bios as officers are elected.
     --------------------------------------------------------- */
  // Tap/click a team card on the About page to open a short profile modal
  // with `story` — a few sentences on who they are and what motivates them.
  // TODO: replace every "Add name" and story placeholder with the real thing.
  team: [
     { name: "Mr. Serunjogi Ambrose", role: "Patron", bio: "Patron of SCC. Guides the club as a professional and bridges the club with opportunity", photo: "assets/profiles/mr.ambrose.jpeg", story: "[Placeholder] Add a short personal story here — how they got into statistics/computing, what drew them to SCC, and what they're hoping to build during their term." },
    { name: "Agaba Ernest", role: "Chairperson", bio: "Chief executive of SCC. Presides over executive meetings and represents the club officially.", photo: "assets/profiles/agaba.jpeg", story: "This club is so dear to my heart. I had the idea to have a club to meet the increasing computing demands of students in SSP. We founded the club with a vision to inspire innovation and build capacity. Over the past year, we have held over 12 session, covered R programming, started and fully registered the club and now launched a website. My hope is that every student in Makerere gets to be part of this vision and that we bridge the gap between theoretical knowledge and practice." },
    { name: "Womala Dalton", role: "Vice Chairperson", bio: "Supports the President and steps in on their behalf when needed.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Kyakwise John Precious", role: "Speaker", bio: "Presides over club events and chairs the Electoral Committee.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Ian Francis Luwalira", role: "General Secretary", bio: "Keeps minutes, correspondence, and the membership register.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Ntezirizaza David", role: "Minister of Finance", bio: "Safeguards funds and presents audited accounts at the AGM.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Odongo John Moses", role: "Projects Manager", bio: "Leads planning and execution of SCC projects and collaborations.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Katushabe Olivia", role: "Public Relations & Social Media Officer", bio: "Publicises events and manages SCC's digital presence.", photo: "", story: "[Placeholder] Add a short personal story here." },
    { name: "Okello Aron", role: "Legal Advisor", bio: "Chairs the Legal Advisory Committee and ensures constitutional compliance.", photo: "", story: "[Placeholder] Add a short personal story here." },
  ],

  /* ---------------------------------------------------------
     6. MEMBERSHIP TIERS — About page comparison table.
     Sourced from the SCC Constitution, Part II.
     --------------------------------------------------------- */
  membershipTiers: [
    {
      name: "Ordinary Member",
      eligibility: "Any registered Makerere University student",
      canVote: true,
      canStandForOffice: false,
      notes: "The default tier — just show up and get involved.",
    },
    {
      name: "Gold Member",
      eligibility: "Pays the annual SCC subscription and attends 2+ events per semester",
      canVote: true,
      canStandForOffice: true,
      notes: "Only Gold Members are eligible to stand for office.",
    },
    {
      name: "Associate Member",
      eligibility: "Alumni, faculty, or students from other institutions",
      canVote: false,
      canStandForOffice: false,
      notes: "Welcome at events; non-voting.",
    },
    {
      name: "Honorary Member",
      eligibility: "Recognised by two-thirds Executive vote for exceptional contribution",
      canVote: false,
      canStandForOffice: false,
      notes: "An earned recognition, not an application-based tier.",
    },
  ],

  /* ---------------------------------------------------------
     7. HOW TO JOIN — About page steps.
     --------------------------------------------------------- */
  howToJoin: [
    "Come to any SCC meeting or event — no application needed to attend as an Ordinary Member.",
    "Register your details with the General Secretary to join the official membership list.",
    "Pay the annual subscription and attend two events in a semester to become a Gold Member and unlock voting/standing rights.",
    "Get involved: workshops, hackathons, and projects are open to everyone from day one.",
  ],

  /* ---------------------------------------------------------
     8. RULES & REGULATIONS — condensed from the SCC Constitution
     for the Home page accordion. Full document available on request
     from the General Secretary.
     --------------------------------------------------------- */
  rules: [
    {
      title: "Name & Purpose",
      body:
        "The Statistical Computing Club (SCC) is a Class A academic association under the Makerere Guild Constitution, supervised by the Minister for Academic Affairs. Its aims: build a community skilled in statistical computing; run workshops, seminars, hackathons, and peer-led tutorials in R, Python, SQL, and related tools; undertake collaborative data-analysis projects; mentor junior students in reproducible research; and promote ethical, open-source approaches to data science.",
    },
    {
      title: "Membership & Registration",
      body:
        "Membership spans Ordinary, Gold, Associate, and Honorary tiers (see the About page for details). SCC maintains a minimum of 35 members, submits its membership register annually to the Dean of Students, and renews registration each academic year.",
    },
    {
      title: "Executive Committee",
      body:
        "The Executive includes the President, Vice Chairperson, Speaker, Deputy Speaker, Projects Manager, General Secretary, Minister of Finance, Public Relations & Social Media Officer, Legal Advisor, Mobiliser, Director of Education, and Year One/Two Coordinators across all four programmes (BSQE, BPS, BSAS, BSTAT).",
    },
    {
      title: "Elections & Terms",
      body:
        "General elections are held once per academic year by secret ballot with results announced same-day. Only Gold Members may stand for office, though all members may vote. Officers serve one-year terms, renewable by re-election. A vote of no confidence requires support from one-third of Gold Members and passes by a two-thirds vote of those present.",
    },
    {
      title: "Meetings & Voting",
      body:
        "At least one Annual General Meeting is held per year, quorum being two-thirds of full members. The Executive Committee meets at least monthly, with the agenda circulated three days in advance. Extraordinary meetings can be convened by the President or by written request from one-third of full members.",
    },
    {
      title: "Finances & Audit",
      body:
        "Funds come from membership subscriptions, grants, donations, and fundraising. The club maintains a bank account co-signed by the President, Finance Minister, and Legal Advisor. No member may hold club funds for more than 48 hours, and the petty cash limit is UGX 200,000. Audited statements are presented at the AGM.",
    },
    {
      title: "Patron",
      body:
        "The Patron is a lecturer at the School of Statistics and Planning who provides guidance and oversight, without voting power in Executive matters.",
    },
  ],
};
