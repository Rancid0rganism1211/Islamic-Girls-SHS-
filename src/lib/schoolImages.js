const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// Official school imagery and data — sourced from the school's own assets.
export const SCHOOL_IMAGES = {
  logo: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/40b741fdd_Logo.jpeg",
  entrance: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/56784cacd_Entrancepic.jpg",
  signboard: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/a12ee88db_Signboard.jpg",
  scienceLab: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/c55a54df9_Sciencelab.jpg",
  ictLab: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/443f308e3_ICTLab.jpg",
  classroom12Unit: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/5c7783a9b_12Unitclassroom.jpg",
  classroom18Unit: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/bd8310e44_Ongoiing18unitclassroomlock.jpg",
  dormPic: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/bfec78cf2_Dormpic.jpg",
  dorm: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/18e4f18dc_Dorm.jpg",
  dorm1: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/9720a77ac_Dorm1.jpg",
  cadet1: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/9e572622c_Cadet1.jpg",
  cadet: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/7abcff726_Cadet.jpg",
  scienceStudents: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/fa19fc3a1_SCiencestudentswithteacher.jpg",
  ictLabPic: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/40e5d5bb2_ICTLabPic.jpg",
  mosque: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/fb6f1bd6a_Mosque.jpg",
  clinic: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/680892fb2_Schoolclinic.jpg",
  staffBungalow: "https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/023e66255_Staffbungalow.jpg",
};

// Official school data extracted from the Signboard asset.
export const SCHOOL_INFO = {
  name: "Islamic Girls' Senior High School",
  shortName: "IGSHS",
  motto: "True Knowledge & Character",
  established: 1999,
  email: "igshs1999@gmail.com",
  gps: "GD-ES0142-4816",
  phone: "+233 24 400 0000",
  address: "P.O. Box 45, Suhum, Eastern Region, Ghana",
  visiting: "1st Saturday of every month",
  programs: ["General Science/Agric", "Business", "Home Economics", "General Arts", "Visual Art"],
};