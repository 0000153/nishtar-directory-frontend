import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import DoctorDetails from "./DoctorDetails";
import AddProfile from "./AddProfile.js";
import "./App.css";

const Home = ({ doctors, setDoctors }) => {  
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.contact.some((c) => c.includes(search)) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.city.toLowerCase().includes(search.toLowerCase()) ||
      doctor.rollNo.includes(search) ||
      doctor.institution.toLowerCase().includes(search.toLowerCase()) ||
      doctor.clinic.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (rollNo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (confirmDelete) {
      const updatedDoctors = doctors.filter((doctor) => doctor.rollNo !== rollNo);
      setDoctors(updatedDoctors);
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    }
  };

  return (
    <div className="container">
      <h1>Nishtar Directory</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name, City, Specialty, Institution or Clinic"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="new-profile-btn" onClick={() => navigate('/add-profile')}>+ Add Profile</button>
      </div>
      <div className="grid">
        {paginatedDoctors.map((doctor) => (
          <div className="card" key={doctor.rollNo}>
            <div className="profile-pic">
              {doctor.image ? <img src={doctor.image} alt={doctor.name} /> : <span>{doctor.name[0]}</span>}
            </div>
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
            <div className="menu" onClick={() => setMenuOpen(menuOpen === doctor.rollNo ? null : doctor.rollNo)}>⋮</div>
            {menuOpen === doctor.rollNo && (
              <div className="menu-options">
                <button onClick={() => navigate(`/doctor/${doctor.rollNo}`)}>View</button>
                <button onClick={() => navigate("/add-profile", { state: { doctor } })}>Edit</button>
                <button onClick={() => handleDelete(doctor.rollNo)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};


const App = () => {
  const initialDoctors = [ 
  { rollNo: "01", name: "Asma Bano", city: "Multan", specialty: "Dermatology & Aesthetics", institution: "DHQ hospital, Multan", clinic: "---", contact: ["03216140694", "03336140694"] },
  { rollNo: "02", name: "Amna Wajdan", city: "Multan", specialty: "Pediatric Medicine", institution: "Associate Professor, Nishtar hospital, Multan", clinic: "---", contact: ["03336252540"] },
  { rollNo: "03", name: "Arshia Mobeen", city: "Lahore", specialty: "Biochemistry", institution: "Allama Iqbal Medical College, Lahore", clinic: "---", contact: ["03227771040"] },
  { rollNo: "05", name: "Adila Ashraf", city: "Lahore", specialty: "Obstetrics & Gynaecology", institution: "Assistant Professor Hayat memorial/ continental medical college, Lahore.", clinic: "Omer Cardiac Hospital, Johar Town branch, Lahore", contact: ["03346051983"] },
  { rollNo: "06", name: "Ayesha Haider", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "08", name: "Aasma Hafeez Ghumman", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "09", name: "Asma Muneer", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "13", name: "Aqsa Imtiaz Hashmi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "14", name: "Adeela Khan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "16", name: "Asma Malik", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "19", name: "Faiza Waseem", city: "Multan", specialty: "Diagnostic Radiology", institution: "Nishtar 2, Multan", clinic: "---", contact: ["03326703288"] },
  { rollNo: "20", name: "Faryal Zafar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "21", name: "Fatima Iqbal", city: "Lahore", specialty: "Diagnostic Radiology", institution: "Lahore General Hospital / PGMI, Lahore", clinic: "---", contact: ["03004114421"] },
  { rollNo: "23", name: "Faiza Ahmad", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "24", name: "Fatima Hashmi", city: "Multan", specialty: "Obstetrics & Gynaecology", institution: "Nishtar Hospital, Multan", clinic: "---", contact: ["03349025736","03008529006"] },
  { rollNo: "26", name: "Guljana Khan", city: "Multan", specialty: "Microbiology", institution: "", clinic: "---", contact: [""] },
  { rollNo: "27", name: "Hina Sehar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "28", name: "Huma Aman", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "29", name: "Hina Ilyas", city: "Sahiwal", specialty: "Obstetrics & Gynaecology/ Urogynae", institution: "Assistant Professor, Gynae unit 2, Sahiwal Medical College &Teaching hospital, sahiwal.", clinic: "Jinnah Medical complex, Sahiwal Langriyal Surgimed Hospital, sahiwal", contact: ["03004283677"] },
  { rollNo: "30", name: "Hafiza Bazgha Madni", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "31", name: "Humaira Malik", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "32", name: "Humaira Bashir", city: "Multan", specialty: "Obstetrics & Gynaecology", institution: "Nishtar hospital, Multan", clinic: "Khursheed Rafik hospital, multan", contact: ["03346057354"] },
  { rollNo: "33", name: "Hanniya Sohaib", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "34", name: "Iram Siddiqui", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "36", name: "Javaria Rasheed", city: "Multan", specialty: "Pediatric Medicine", institution: "Nishtar Hospital, Multan", clinic: "Khursheed Rafik hospital, multan", contact: ["03106684904",'03336104643'] },
  { rollNo: "37", name: "Jawaria ", city: "Lodhra", specialty: "Obstetrics & Gynaecology", institution: "Rasheed ", clinic: "---", contact: ["03336080903"] },
  { rollNo: "38", name: "Afshan Rasheed", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "39", name: "Maria Mamtaz", city: "Multan", specialty: "Public Health", institution: "SHC&ME, South Secreteriat, Multan", clinic: "---", contact: ["03017407777"] },
  { rollNo: "40", name: "Mehwish Mustafa", city: "Gujranwala", specialty: "Consultant Haematologist", institution: "Care Pro Diagnostic Centre, Gujranwala", clinic: "---", contact: ["---"] },
  { rollNo: "41", name: "Madiha Arif", city: "Muscat, Oman", specialty: "Clinical Oncology", institution: "Oncology department, royal hospital, muscat", clinic: "---", contact: ["+971588015947"] },
  { rollNo: "42", name: "Munazza Shahab", city: "Khanpur", specialty: "Obstetrics & Gynaecology", institution: "Consultant Gynaecologist, THQ  Hospital, Liaqatpur", clinic: "AlHayat medicare, khanpur", contact: ["03353167523"] },
  { rollNo: "43", name: "Madiha Ishaq", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "45", name: "Memona Koshi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "46", name: "Mariam Saba", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "47", name: "Ayesha Haider", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "48", name: "Moona Razzaq", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "50", name: "Misbah Maqbool", city: "Mianwali", specialty: "Obstetrics & Gynaecology", institution: "THQ Hospital, Piplan, Mianwali", clinic: "Imran Memorial hospital, piplan didtt, mianwali", contact: ["03005138806"] },
  { rollNo: "51", name: "Madeeha Riaz", city: "Multan", specialty: "Obstetrics & Gynaecology", institution: "Nishtar Hospital.Multan", clinic: "----", contact: ["03336154703"] },
  { rollNo: "52", name: "Nadia Taj", city: "Multan", specialty: "Obstetrics & Gynaecology", institution: "Nishtar Hospital.Multan", clinic: "----", contact: ["03006791230"] },
  { rollNo: "53", name: "Nadia Maryam", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "54", name: "Nadia Faiz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "55", name: "Qurat ul Ain Sabih", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "56", name: "Rabia Pervaiz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "57", name: "Rameesha Iftikhar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "61", name: "Rabeeta Sheikh", city: "Peshawar", specialty: "Clinical and Radiation Oncology", institution: "SKMCH, Peshawar ", clinic: "----", contact: ["03259822070","03336133794"] },
  { rollNo: "62", name: "Rahat Akhtar", city: "Multan", specialty: "Obstetrics & Gynaecology", institution: "Nishtar Hospital.Multan", clinic: "----", contact: ["03347698752"] },
  { rollNo: "65", name: "Sana Arshad", city: "Multan", specialty: "Neonatal Pediatrics.", institution: "Mukhtar A Sheikh Hospital,Multan", clinic: "----", contact: ["03226723165"] },
  { rollNo: "70", name: "Sahar Mushtaq", city: "Multan", specialty: "Diagnostic radiology", institution: "DHQ Muzaffargarh", clinic: "Alpha Diagnostic and ultrasound center, Muzafargarh", contact: ["03366806330"] },
  { rollNo: "74", name: "Saba Hashmi", city: "Wah Cantt", specialty: "Obstetrics & Gynaecology", institution: "HOD Wah general hospital.", clinic: "Shamshad Aslam hospital, IDC, Wah Cantt", contact: ["03337673009"] },
  { rollNo: "75", name: "Saba Jalal", city: "Wah Cantt", specialty: "Maternal and child health.", institution: "---", clinic: "---", contact: ["03325933042"] },
  { rollNo: "78", name: "Sundas Faheem", city: "Narowal", specialty: "Dermatology & Aesthetics.", institution: "---", clinic: "CEO safeena hospital, Narowal", contact: ["03044774648","03472884912"] },
  { rollNo: "85", name: "Tayyaba Rafiq", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "89", name: "Abrar Hussain Shah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "90", name: "Arsalan Akbar Saeed", city: "Multan", specialty: "Nephrology", institution: "Nishtar Hospital, Multan", clinic: "----", contact: ["03146170000"] },
  { rollNo: "91", name: "Asmat Ullah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "92", name: "Abid Mushtaq", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "93", name: "Aziz Ullah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "94", name: "Abdul Basit", city: "Multan", specialty: "Pediatric Neurologist", institution: "CHC Multan", clinic: "Haleema Hospital, Nishtar road, Multan", contact: ["03331690059"] },
  { rollNo: "95", name: "Asim Waqar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "96", name: "Aamir Bashir", city: "Multan", specialty: "Medicine/ Endocrinology", institution: "Assistant Professor internal medicine, SIMS, Lodhran", clinic: "Medicare Multan", contact: ["03457303138"] },
  { rollNo: "97", name: "Atta Ur Rehman Khan", city: "Dera Ghazi Khan", specialty: "Neurosurgery /Brain n Spine surgeon ", institution: "DG khan Medical college.", clinic: "----", contact: ["03336106294"] },
  { rollNo: "98", name: "Asim Idrees", city: "Riyadh, KSA", specialty: "Critical Care Medicine", institution: "King Faisal Specialist hospital, Riyadh.", clinic: "----", contact: ["03227548429","+966594686799"] },
  { rollNo: "99", name: "Amir Javaid", city: "Multan", specialty: "General Surgery / Vascular Surgery", institution: "South Punjab Hospital, Multan", clinic: "----", contact: ["03036746884"] },
  { rollNo: "100", name: "Adnan Nazir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "101", name: "Aurang Zeb", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "102", name: "Qurat ul Ain Sabih", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "103", name: "Asim Saif Ullah", city: "Faisalabad", specialty: "General & Pediatric orthopedic surgeon", institution: "HOD, Children hospital faisalabad", clinic: "Masood hospital, Lahore.Evercare hospital, Lahore.", contact: ["03336190572"] },
  { rollNo: "104", name: "Baqir Hussain ", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "105", name: "Farhan Ahmad Khan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "106", name: "Faisal Akbar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "107", name: "Faisal Zafar", city: "Multan", specialty: "Pediatric Neurology", institution: "Assistant Professor, Children Hospital, multan", clinic: "Azeem hospital, tariq road, multan", contact: ["03007195420","03337195420"] },
  { rollNo: "109", name: "Faraz Mahmood Khan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "110", name: "Faisal Masood", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "111", name: "Fawad Qadir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "112", name: "Faheem Ahmad Usmani", city: "Lahore", specialty: "Neurosurgery / Spine surgery", institution: "Ghurki trust teaching hospital,Lahore", clinic: "IDC,Jail road, lahore", contact: ["03336441989"] },
  { rollNo: "113", name: "Ghulam Mujtaba", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "114", name: "Ghulam Nabi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "115", name: "Ghazanfar Nadeem Ansari", city: "Multan", specialty: "Neonatal Pediatrics", institution: "NICU, Nishtar Hospital, Multan.", clinic: "Azeem hospital, tariq road, multan", contact: ["03226738038"] },
  { rollNo: "116", name: "Ghulam Abbas", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "117", name: "Mustafa", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "120", name: "Hassan Rabbani", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "121", name: "Hassan Akhtar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "122", name: "Hafiz Sajid Nadeem", city: "Mianwali", specialty: "Anesthesia", institution: "THQ hospital, Isakhel.", clinic: "----", contact: ["03336835121"] },
  { rollNo: "123", name: "Yasir Raheem Malik", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "124", name: "Nasir Hussain", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "125", name: "Hafiz Muhammad Rizwan", city: "Rahim Yar Khan", specialty: "Pediatric Neurology", institution: "Sheikh zayed medical college, rahim yar khan", clinic: "Hamza medicare, RYk", contact: ["03346070762"] },
  { rollNo: "126", name: "Hasnain Abid", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "127", name: "Hassan Akbar Khan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "128", name: "Imtiaz Hussain", city: "Lahore", specialty: "General Surgery", institution: "Sir ganga ram hospital, lahore", clinic: "Punjab medical center, jail road, lahore", contact: ["03216303551"] },
  { rollNo: "129", name: "Imran Rafique", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "130", name: "Imran Khokhar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "131", name: "Imtiaz Hussain", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "132", name: "Hafiz Shafiq ur Rehman", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "133", name: "Javed Iqbal", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "134", name: "Khuram Rashid", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "135", name: "Khaleeq Hussain Siddiqui", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "136", name: "Hafiz Muhammad Rizwan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "137", name: "Khurram Mubeen Khan", city: "Lahore", specialty: "Public Health", institution: "UNICEF Pakistan as Immunization Officer , Punjab", clinic: "----", contact: ["03216384444"] },
  { rollNo: "138", name: "Muhammad Farhan Qureshi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "139", name: "Muhammad Faisal", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "140", name: "Muhammad Atiq ul Mannan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "141", name: "Muhammad Ejaz Ashraf", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "142", name: "Muhammad Aamir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "143", name: "Muhamad Umair Ijaz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "144", name: "Muhammad Umair Khawar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "145", name: "Muhammad Irfan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "146", name: "Muhammad Afzal Shah", city: "Islamabad", specialty: "Public health/ Infectious disease, Epidemiology", institution: "US center for Disease control & prevention (CDC).", clinic: "-----", contact: ["03325423549"] },
  { rollNo: "147", name: "Muhammad Irfan Shah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "148", name: "Muhammad Umer Farooq", city: "Jampur", specialty: "Cardiology", institution: "THQ Hospital, Jampur", clinic: "Ibrahim medicare hospital, jampur", contact: ["03337471320"] },
  { rollNo: "149", name: "Naveed Aslam", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "150", name: "Muhamad Kamran", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "151", name: "Muhammad Zahid Siddique", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "152", name: "Muhammad Asif Yaseen", city: "Multan", specialty: "Internal Medicine", institution: "RTEH Muzaffargarh", clinic: "Buch International hospital, multan", contact: ["03366019918"] },
  { rollNo: "153", name: "Muhammad Mujahid Sharif", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "154", name: "Muhammad Adnan Rashid", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "155", name: "Muhammad Farrukh Bashir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "156", name: "Muhammad Adnan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "158", name: "Muhammad Aslam", city: "Vehari", specialty: "Pulmonolgy & Sleep medicine.", institution: "DHQ Hospital, Vehari", clinic: "----", contact: ["03339187773"] },
  { rollNo: "159", name: "Muhammad Ammar Ashraf", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "160", name: "Muhammad Shoaib Akhtar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "161", name: "Muhammad Mujahid Nawab", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "162", name: "Muhammad Nadeem Anwar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "163", name: "Mudassar Saeed Pansoota", city: "Bahawalpur", specialty: "Urology", institution: "Shahida Islam Teaching Hospital, Lodhran", clinic: "----", contact: ["03223044443"] },
  { rollNo: "164", name: "Muhammad Jahangir Riaz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "165", name: "Muhammad Abu Bakar", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "166", name: "Muhammad Imran Malik", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "167", name: "Muhammad Jibran Rabbani", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "168", name: "Muhammad Zulfiqar Akram", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "169", name: "Muhammad Usman Sadiq", city: "Okara", specialty: "Family Medicine", institution: "-----", clinic: "Farzana Sadiq hospital, M A Jinnah road, okara", contact: ["03457502280"] },
  { rollNo: "170", name: "Muhammad Junaid Arshad", city: "Mian Channu", specialty: "Radiology", institution: "----", clinic: "Al Manzoor Hospital, Mian Channu", contact: ["03336101252"] },
  { rollNo: "171", name: "Irfan Ahmad Sualeh", city: "Jhang", specialty: "Ophthalmology / VR", institution: "-----", clinic: "Bilquis medicare hospital, main gojra road, jhang.", contact: ["03336756682"] },
  { rollNo: "172", name: "Muhammad Farooq Khan", city: "Multan", specialty: "Dermatology", institution: "Allama Iqbal Teaching Hospital, Dera Ghazi Khan.", clinic: "Shop No. 36-38, Dost Plaza, ground floor near chughtai lab, multan", contact: ["03336846114"] },
  { rollNo: "173", name: "Muhammad Idrees", city: "Sahiwal", specialty: "Internal Medicine / Rheumatology", institution: "----", clinic: "Ibrahim polyclinic, mission chowk, sahiwal", contact: ["03006646536"] },
  { rollNo: "174", name: "Muhammad Siddique", city: "Lahore", specialty: "General Surgery", institution: "Punjab Rangers Teaching Hospital,Lahore.", clinic: "Ramzan Ali Syed Hospital, temple road Lahore.Prime care hospital, super town, DHA, Lahore", contact: ["03338116570"] },
  { rollNo: "175", name: "Muhammad Sarfraz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "176", name: "Muhammad Saeed", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "177", name: "Muhammad Akhtar Faridi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "178", name: "Majid Aslam", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "179", name: "Mirza Sajid Amin", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "181", name: "Muhammad Zubair Malghani", city: "Multan", specialty: "Gastroenterology & Hepatology", institution: "Nishtar Hospital, Multan", clinic: "National hospital and polyclinic first floor, dost plaza, nishtar road multan. multan", contact: ["03324212474","03443024593"] },
  { rollNo: "183", name: "Muhammad Naeem", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "184", name: "Muhammad Saleem", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "185", name: "Muhammad Kaleem Ullah", city: "Multan", specialty: "Thoracic surgery", institution: "Nishtar Hospital, Multan.", clinic: "Fatima Medical center, rashidabad chowk, multan", contact: ["03454844440"] },
  { rollNo: "186", name: "Muhammad Imran  Yawar", city: "Port Moresby", specialty: "Ophthalmology / VR", institution: "Pacific international hospital, port Moresby", clinic: "----", contact: ["03334063092","03334063092"] },
  { rollNo: "188", name: "Muhammad Ahmad Abdullah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "190", name: "Nosherwan Adil", city: "Multan", specialty: "Ophtalmology/ vitreo retina/ cornea", institution: "Nishtar Hospital, Multan", clinic: "Zainab Arcade, Nishtar road, multan", contact: ["03336009358"] },
  { rollNo: "191", name: "Noman Aslam", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "192", name: "Nasir Abbas Baloch", city: "Jhang", specialty: "Pediatric Medicine", institution: "DHQ Hospital, jhang", clinic: "Muhammad Medical complex, Gojra road, Jhang", contact: ["03006502989"] },
  { rollNo: "193", name: "Rizwan Hameed", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "194", name: "Rana Kalim Ullah", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "195", name: "Rana Fahad Ibrahim", city: "Multan", specialty: "Ophthalmology/ VR", institution: "----", clinic: "Rana Eye Care, Multan", contact: ["03334828568"] },
  { rollNo: "196", name: "Shoaib Ahmad", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "197", name: "Shahid Iqbal", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "198", name: "Syed Sarmad Ali Naqvi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "199", name: "Shahid Naeem", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "200", name: "Syed Tauqeer Bukhari", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "201", name: "Suleman Ahmad", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "203", name: "Shoaib Liaqat", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "204", name: "Sajid Hussain", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "205", name: "Salman Atiq Siddique", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "206", name: "Shafiq ur Rehman", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "207", name: "Muhammad Shabbir Ahmad", city: "Multan", specialty: "General Surgery", institution: "Professor of surgery, Bakhtawar Amin Medical college, Multan.", clinic: "Medicare Hospital, Multan", contact: ["03336058036"] },
  { rollNo: "208", name: "Sakhawat Abbas", city: "Lahore", specialty: "Internal Medicine", institution: "HOD, Kot khawaja saeed teaching hospital, lahore", clinic: "-----", contact: ["03216318289"] },
  { rollNo: "209", name: "Samee Ullah Khan", city: "Sahiwal", specialty: "Nephrology", institution: "Associate professor, Sahiwal medical college & teaching hospital.", clinic: "----", contact: ["03458256560"] },
  { rollNo: "210", name: "Shoukat Hussain", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "211", name: "Salman Ali Syed", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "212", name: "Shahid Iqbal Mirza", city: "Riyadh, KSA", specialty: "Anesthesia/Cardiac Anesthesia", institution: "Prince Sultan Cardiac Center, Riyadh, KSA", clinic: "-----", contact: ["+966538782304"] },
  { rollNo: "213", name: "Sajid Iqbal Nayyar", city: "Lahore", specialty: "Pediatric Surgery", institution: "Assistant Professor, Children Hospital, lahore", clinic: "LAHORE CARE HOSPITAL.Alnoor hospital, ferozpur road, Lahore.", contact: ["03317004683"] },
  { rollNo: "215", name: "Usman Ahmad Khan", city: "Oklahoma city, USA", specialty: "Internal Medicine & Nephrology", institution: "Consultant nephrologist at University of Oklahoma & St. Anthony Hospital, Oklahoma", clinic: "----", contact: ["+14056974750"] },
  { rollNo: "217", name: "Usman Shah Nawaz", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "218", name: "Usman Ali", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "219", name: "Usman Anjum", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "220", name: "Waqas Noor Chughtai", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "222", name: "Yousaf Bin Tahir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "224", name: "Zahid Abbas", city: "Multan", specialty: "Adult Neurology", institution: "-----", clinic: "Abbas Neuro clinic, Nishtar Road, Multan.Seyal hospital, kutchery road, multan", contact: ["03436979017","03156367807"] },
  { rollNo: "225", name: "Zeeshan Ghous", city: "Lahore", specialty: "Cardiology", institution: "Assistant Professor, Punjab institute of cardiology, lahore", clinic: "----", contact: ["03336190568"] },
  { rollNo: "226", name: "Muhammad Ahmad bhatti", city: "Arifwala", specialty: "Orthopedic surgeon", institution: "THQ hospital , Arifwala", clinic: "----", contact: ["03336061204"] },
  { rollNo: "231", name: "Ch. Adeel Ebad", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "234", name: "Maria Hussain Rizvi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "236", name: "Abu Abdullah Hussain Mazumder", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "246", name: "Asad Naeem Sheikh", city: "Rawalpindi", specialty: "Pediatric Medicine", institution:"---", clinic: "Naeem clinic, Rawalpindi", contact: ["03219506474"] },
  { rollNo: "247", name: "Fahma Mehdi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "250", name: "Tayyaba Saleem", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "251", name: "Yasir Abbas", city: "Rawalpindi", specialty: "Medicine/ Clinical Hematologist & Bone marrow transplant physician.", institution: "Armed forces, bone marrow transplant center, Rawalpindi.", clinic: "----", contact: ["03331950881"] },
  { rollNo: "252", name: "Muhammad Asad Munir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "255", name: "Sadia Majeed", city: "DG Khan", specialty: "Basic Sciences", institution: "DG khan medical college.", clinic: "----", contact: ["03344165959"] },
  { rollNo: "256", name: "Nazir Ahmad", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "257", name: "Aamer Shabab", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "262", name: "Muhammad Imran", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "263", name: "Abdul Hadi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "264", name: "Ayesha Bashir", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "268", name: "Muhammad Ali", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "270", name: "Mansoor Ghani", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "277", name: "Abdi Muhammad Abdi", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },
  { rollNo: "286", name: "Sadaf Ehsan", city: "----", specialty: "----", institution: "----", clinic: "---", contact: [""] },

];

const [doctors, setDoctors] = useState(() => {
  const savedDoctors = localStorage.getItem("doctors");
  return savedDoctors ? JSON.parse(savedDoctors) : initialDoctors;
});

useEffect(() => {
  localStorage.setItem("doctors", JSON.stringify(doctors));
}, [doctors]);

return (
  <Router>
    <Routes>
      <Route path="/" element={<Home doctors={doctors} setDoctors={setDoctors} />} />
      <Route path="/doctor/:rollNo" element={<DoctorDetails doctors={doctors} />} />

      <Route path="/add-profile" element={<AddProfile doctors={doctors} setDoctors={setDoctors} />} />
    </Routes>
  </Router>
);
};

export default App;
