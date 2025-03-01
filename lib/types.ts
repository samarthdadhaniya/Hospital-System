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
  name: string
  location: string
  emergencyContact: string
  medicalInfo: string[]
}

