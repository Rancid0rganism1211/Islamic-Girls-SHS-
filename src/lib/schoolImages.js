import logo from "../assets/images/logo.png";
import entrance from "../assets/images/entrance.png";
import signboard from "../assets/images/signboard.jpeg";
import scienceLab from "../assets/images/scienceLab.png";
import ictLab from "../assets/images/ictLab.png";
import classroom12Unit from "../assets/images/classroom12Unit.png";
import classroom18Unit from "../assets/images/classroom18Unit.jpeg";
import dormPic from "../assets/images/dormPic.jpeg";
import dorm from "../assets/images/dorm.jpeg";
import dorm1 from "../assets/images/dorm1.jpeg";
import cadet1 from "../assets/images/cadet1.jpeg";
import cadet from "../assets/images/cadet.jpeg";
import scienceStudents from "../assets/images/scienceStudents.jpeg";
import ictLabPic from "../assets/images/ictLabPic.jpeg";
import mosque from "../assets/images/mosque.png";
import clinic from "../assets/images/clinic.jpeg";
import staffBungalow from "../assets/images/staffBungalow.jpeg";

const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// Official school imagery and data — sourced from the school's own assets.
export const SCHOOL_IMAGES = {
  logo,
  entrance,
  signboard,
  scienceLab,
  ictLab,
  classroom12Unit,
  classroom18Unit,
  dormPic,
  dorm,
  dorm1,
  cadet1,
  cadet,
  scienceStudents,
  ictLabPic,
  mosque,
  clinic,
  staffBungalow,
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