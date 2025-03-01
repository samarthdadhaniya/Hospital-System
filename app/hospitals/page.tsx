"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HospitalForm from "@/components/hospitals/hospital-form"
import { getHospitals, saveHospitals } from "@/lib/data"
import type { Hospital } from "@/lib/types"
import { AlertCircle, Building2, Edit, MapPin, Phone, Plus, Trash } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null)
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" })

  useEffect(() => {
    const loadedHospitals = getHospitals()
    setHospitals(loadedHospitals)
  }, [])

  const handleAddHospital = (hospital: Hospital) => {
    if (editingHospital) {
      // Update existing hospital
      const updatedHospitals = hospitals.map((h) => (h.id === editingHospital.id ? hospital : h))
      setHospitals(updatedHospitals)
      saveHospitals(updatedHospitals)
      setAlert({ show: true, message: "Hospital updated successfully!", type: "success" })
    } else {
      // Add new hospital
      const newHospital = {
        ...hospital,
        id: Date.now().toString(),
      }
      const newHospitals = [...hospitals, newHospital]
      setHospitals(newHospitals)
      saveHospitals(newHospitals)
      setAlert({ show: true, message: "Hospital added successfully!", type: "success" })
    }

    setIsFormOpen(false)
    setEditingHospital(null)

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" })
    }, 3000)
  }

  const handleEditHospital = (hospital: Hospital) => {
    setEditingHospital(hospital)
    setIsFormOpen(true)
  }

  const handleDeleteHospital = (id: string) => {
    const updatedHospitals = hospitals.filter((hospital) => hospital.id !== id)
    setHospitals(updatedHospitals)
    saveHospitals(updatedHospitals)
    setAlert({ show: true, message: "Hospital deleted successfully!", type: "success" })

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" })
    }, 3000)
  }

  const closeModal = () => {
    setIsFormOpen(false)
    setEditingHospital(null)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Hospitals</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-1">
          <Plus className="h-4 w-4" /> Add Hospital
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
            <DialogTitle>{editingHospital ? "Edit Hospital" : "Add New Hospital"}</DialogTitle>
          </DialogHeader>
          <HospitalForm onSubmit={handleAddHospital} onCancel={closeModal} initialData={editingHospital} />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <Card key={hospital.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-primary/5 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3.5 w-3.5" /> Address
                  </div>
                  <p className="font-medium text-sm">{hospital.address}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Phone className="h-3.5 w-3.5" /> Contact
                  </div>
                  <p className="font-medium text-sm">{hospital.contactNumber}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t bg-muted/10 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditHospital(hospital)}
                  className="h-8 px-2 text-xs"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteHospital(hospital.id)}
                  className="h-8 px-2 text-xs"
                >
                  <Trash className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
            <Building2 className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium mb-1">No hospitals found</p>
            <p className="text-sm mb-4">Add a hospital to get started</p>
            <Button onClick={() => setIsFormOpen(true)} variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> Add Hospital
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

