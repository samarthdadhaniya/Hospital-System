export interface Doctor {
  id: string
  name: string
  specialty: string
  availability: string
}

export interface Hospital {
  id: string
  name: string
  address: string
  contactNumber: string
}

export interface Patient {
  id: string
  uid: string
  name: string
  email: string
  phoneNumber: string
  dob: string
  gender: string
  bloodType: string
  height: string
  weight: string
  isActive: boolean
  chronicDiseases: string
  familyHistoryOfChronicDiseases: string
  date: string
}