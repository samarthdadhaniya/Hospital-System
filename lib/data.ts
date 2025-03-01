import type { Doctor, Hospital, Patient } from "./types"

// Mock data for patients (simulating Firebase data)
const mockPatients = [
  {
    id: "P001",
    name: "John Doe",
    location: "New York, NY",
    emergencyContact: "+1 (555) 123-4567",
    medicalInfo: ["Allergic to penicillin", "Asthma"],
  },
  {
    id: "P002",
    name: "Jane Smith",
    location: "Los Angeles, CA",
    emergencyContact: "+1 (555) 987-6543",
    medicalInfo: ["Diabetes Type 2", "Hypertension"],
  },
  {
    id: "P003",
    name: "Robert Johnson",
    location: "Chicago, IL",
    emergencyContact: "+1 (555) 456-7890",
    medicalInfo: ["Heart condition", "Cholesterol"],
  },
  {
    id: "P004",
    name: "Emily Davis",
    location: "Houston, TX",
    emergencyContact: "+1 (555) 234-5678",
    medicalInfo: ["Pregnant - 2nd trimester", "Iron deficiency"],
  },
  {
    id: "P005",
    name: "Michael Wilson",
    location: "Phoenix, AZ",
    emergencyContact: "+1 (555) 876-5432",
    medicalInfo: ["Recovering from surgery", "Physical therapy"],
  },
  {
    id: "P006",
    name: "Sarah Brown",
    location: "Philadelphia, PA",
    emergencyContact: "+1 (555) 345-6789",
    medicalInfo: ["Allergic to nuts", "Migraines"],
  },
  {
    id: "P007",
    name: "David Miller",
    location: "San Antonio, TX",
    emergencyContact: "+1 (555) 654-3210",
    medicalInfo: ["Arthritis", "High blood pressure"],
  },
  {
    id: "P008",
    name: "Lisa Garcia",
    location: "San Diego, CA",
    emergencyContact: "+1 (555) 789-0123",
    medicalInfo: ["Thyroid condition", "Anxiety"],
  },
]

// Initial sample data for doctors
const initialDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Alex Johnson",
    specialty: "Cardiology",
    availability: "Available",
  },
  {
    id: "D002",
    name: "Dr. Sarah Williams",
    specialty: "Pediatrics",
    availability: "Not Available",
  },
  {
    id: "D003",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    availability: "Available",
  },
]

// Initial sample data for hospitals
const initialHospitals: Hospital[] = [
  {
    id: "H001",
    name: "General Hospital",
    address: "123 Main St, Anytown, USA",
    contactNumber: "+1 (555) 123-4567",
  },
  {
    id: "H002",
    name: "Children's Medical Center",
    address: "456 Oak Ave, Somewhere, USA",
    contactNumber: "+1 (555) 987-6543",
  },
]

// Functions to get and save data from/to localStorage

export function getDoctors(): Doctor[] {
  if (typeof window === "undefined") return initialDoctors

  const storedDoctors = localStorage.getItem("doctors")
  if (!storedDoctors) {
    // Initialize with sample data if empty
    localStorage.setItem("doctors", JSON.stringify(initialDoctors))
    return initialDoctors
  }

  return JSON.parse(storedDoctors)
}

export function saveDoctors(doctors: Doctor[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("doctors", JSON.stringify(doctors))
}

export function getHospitals(): Hospital[] {
  if (typeof window === "undefined") return initialHospitals

  const storedHospitals = localStorage.getItem("hospitals")
  if (!storedHospitals) {
    // Initialize with sample data if empty
    localStorage.setItem("hospitals", JSON.stringify(initialHospitals))
    return initialHospitals
  }

  return JSON.parse(storedHospitals)
}

export function saveHospitals(hospitals: Hospital[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("hospitals", JSON.stringify(hospitals))
}

// Function to get patients (simulating Firebase fetch)
export function getPatients(){
  // In a real app, this would be a Firebase fetch
  return mockPatients
}

