"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DoctorForm from "@/components/doctors/doctor-form"
import { getDoctors, saveDoctors } from "@/lib/data"
import type { Doctor } from "@/lib/types"
import { AlertCircle, Edit, Plus, Trash, UserRound } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" })

  useEffect(() => {
    const loadedDoctors = getDoctors()
    setDoctors(loadedDoctors)
  }, [])

  const handleAddDoctor = (doctor: Doctor) => {
    if (editingDoctor) {
      // Update existing doctor
      const updatedDoctors = doctors.map((d) => (d.id === editingDoctor.id ? doctor : d))
      setDoctors(updatedDoctors)
      saveDoctors(updatedDoctors)
      setAlert({ show: true, message: "Doctor updated successfully!", type: "success" })
    } else {
      // Add new doctor
      const newDoctor = {
        ...doctor,
        id: Date.now().toString(),
      }
      const newDoctors = [...doctors, newDoctor]
      setDoctors(newDoctors)
      saveDoctors(newDoctors)
      setAlert({ show: true, message: "Doctor added successfully!", type: "success" })
    }

    setIsFormOpen(false)
    setEditingDoctor(null)

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" })
    }, 3000)
  }

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setIsFormOpen(true)
  }

  const handleDeleteDoctor = (id: string) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id)
    setDoctors(updatedDoctors)
    saveDoctors(updatedDoctors)
    setAlert({ show: true, message: "Doctor deleted successfully!", type: "success" })

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" })
    }, 3000)
  }

  const closeModal = () => {
    setIsFormOpen(false)
    setEditingDoctor(null)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-1">
          <Plus className="h-4 w-4" /> Add Doctor
        </Button>
      </div>

      {alert.show && (
        <Alert className={alert.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
          <AlertCircle className={`h-4 w-4 ${alert.type === "success" ? "text-green-600" : "text-red-600"}`} />
          <AlertDescription className={alert.type === "success" ? "text-green-600" : "text-red-600"}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
          </DialogHeader>
          <DoctorForm onSubmit={handleAddDoctor} onCancel={closeModal} initialData={editingDoctor} />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-primary/5 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${doctor.availability === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {doctor.availability}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-1">Specialty</p>
                <p className="font-medium">{doctor.specialty}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditDoctor(doctor)}
                  className="h-8 px-2 text-xs"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="h-8 px-2 text-xs"
                >
                  <Trash className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
            <UserRound className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium mb-1">No doctors found</p>
            <p className="text-sm mb-4">Add a doctor to get started</p>
            <Button onClick={() => setIsFormOpen(true)} variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> Add Doctor
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

