"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPatients } from "@/lib/data"
import type { Patient } from "@/lib/types"
import { AlertTriangle, Loader2, MapPin, Phone, User } from "lucide-react"

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching from Firebase
    const fetchPatients = async () => {
      setLoading(true)
      try {
        // In a real app, this would be a Firebase fetch
        const loadedPatients = getPatients()

        // Simulate network delay
        setTimeout(() => {
          setPatients(loadedPatients)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching patients:", error)
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Loading patients data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Patients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-primary/5 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </div>
                <p className="font-medium text-sm">{patient.location}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Phone className="h-3.5 w-3.5" /> Emergency Contact
                </div>
                <p className="font-medium text-sm">{patient.emergencyContact}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> Medical Information
                </div>
                <ul className="list-disc list-inside pl-1 text-sm space-y-1">
                  {patient.medicalInfo.map((info, index) => (
                    <li key={index} className="text-sm">
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

