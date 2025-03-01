import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import type { Doctor, Hospital, Patient } from "./types"

// Fetch patients dynamically from Firestore
export async function getPatients(): Promise<Patient[]> {
  const patientsCollection = collection(db, "users")
  const snapshot = await getDocs(patientsCollection)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Patient, "id">),
  }))
}

// Fetch doctors dynamically from Firestore
export async function getDoctors(): Promise<Doctor[]> {
  const doctorsCollection = collection(db, "doctors")
  const snapshot = await getDocs(doctorsCollection)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Doctor, "id">),
  }))
}

// Fetch hospitals dynamically from Firestore
export async function getHospitals(): Promise<Hospital[]> {
  const hospitalsCollection = collection(db, "hospitals")
  const snapshot = await getDocs(hospitalsCollection)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Hospital, "id">),
  }))
}